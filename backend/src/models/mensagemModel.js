const prisma = require('../generated/prisma');

const listarMensagens = async () => {
  return prisma.mensagem.findMany({
    orderBy: {
      dataEnvio: 'asc'
    },
    include: {
      remetente: true,
      destinatario: true,
      troca: true
    }
  });
};

const buscarMensagemPorId = async (id) => {
  const mensagem = await prisma.mensagem.findUnique({
    where: { id },
    include: {
      remetente: true,
      destinatario: true,
      troca: true
    }
  });

  if (!mensagem) {
    throw new Error('Mensagem não encontrada!');
  }

  return mensagem;
};

const criarMensagem = async (dadosMensagem) => {
  if (!dadosMensagem.conteudo || !dadosMensagem.remetenteId || !dadosMensagem.destinatarioId || !dadosMensagem.trocaId) {
    throw new Error('Conteúdo, remetente, destinatário e troca são obrigatórios.');
  }

  return prisma.mensagem.create({
    data: dadosMensagem,
    include: {
      remetente: true,
      destinatario: true,
      troca: true
    }
  });
};

const atualizarMensagem = async (id, dadosParaAtualizar) => {
  const mensagemExistente = await prisma.mensagem.findUnique({
    where: { id }
  });

  if (!mensagemExistente) {
    throw new Error('Mensagem não encontrada!');
  }

  return prisma.mensagem.update({
    where: { id },
    data: dadosParaAtualizar,
    include: {
      remetente: true,
      destinatario: true,
      troca: true
    }
  });
};

const deletarMensagem = async (id) => {
  const mensagemExistente = await prisma.mensagem.findUnique({
    where: { id }
  });

  if (!mensagemExistente) {
    throw new Error('Mensagem não encontrada!');
  }

  return prisma.mensagem.delete({
    where: { id }
  });
};

module.exports = {
  listarMensagens,
  buscarMensagemPorId,
  criarMensagem,
  atualizarMensagem,
  deletarMensagem
};