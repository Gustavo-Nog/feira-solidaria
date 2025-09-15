const prisma = require('../generated/prisma');

const solicitarDoacao = async (receptorId, produtoId) => {
  const produto = await prisma.produto.findUnique({
    where: { id: produtoId },
  });

  if (!produto) {
    throw new Error('Produto não encontrado.');
  }
  if (!produto.pessoaId) {
    throw new Error('Este produto não tem um doador associado.');
  }
  if (produto.pessoaId === receptorId) {
    throw new Error('Você não pode solicitar um item que pertence a si mesmo.');
  }

  const doadorId = produto.pessoaId;

  return prisma.doacao.create({
    data: {
      status: 'PENDENTE',
      produtoId: produtoId,
      receptorId: receptorId,
      doadorId: doadorId,
      dataSolicitacao: new Date(),
    },
  });
};

const listarDoacoesPorPessoa = async (pessoaId) => {
  return prisma.doacao.findMany({
    where: {
      OR: [
        { doadorId: pessoaId },
        { receptorId: pessoaId },
      ],
    },
    include: {
      produto: true,
      doador: { select: { nome: true } },
      receptor: { select: { nome: true } },
    },
    orderBy: {
      dataSolicitacao: 'desc',
    },
  });
};

const buscarDoacaoPorId = async (doacaoId) => {
  return prisma.doacao.findUnique({
    where: { id: doacaoId },
    include: {
      produto: true,
      doador: true,
      receptor: true,
      mensagens: true,
    },
  });
};

const atualizarStatusDoacao = async (doacaoId, novoStatus, usuarioQueAtualizaId) => {
  const doacao = await prisma.doacao.findUnique({
    where: { id: doacaoId },
  });

  if (!doacao) {
    throw new Error('Doação não encontrada.');
  }

  if (doacao.doadorId !== usuarioQueAtualizaId) {
    throw new Error('Apenas o doador pode alterar o status desta solicitação.');
  }

  return prisma.doacao.update({
    where: { id: doacaoId },
    data: { status: novoStatus },
  });
};

module.exports = {
  solicitarDoacao,
  listarDoacoesPorPessoa,
  buscarDoacaoPorId,
  atualizarStatusDoacao,
};
