const prisma = require('../generated/prisma');

const listarPessoas = async () => {
  return prisma.pessoa.findMany({
    orderBy: {
      nome: "asc"
    }
  });
};

const buscarPessoaPorId = async (id) => {
  return prisma.pessoa.findUnique({
    where: {
      id: id
    },
    include: {
      telefones: true,
      enderecos: {
        include: {
          endereco: true
        }
      },
      produtos: {
        include: {
          categoria: true
        }
      },
      usuario: {
        select: {
          email: true,
          nomeUsuario: true,
          tipo: true
        }
      }
    }
  });
};

const criarPessoa = async (dadosPessoa) => {
  if (!dadosPessoa.nome || !dadosPessoa.usuarioId) {
    throw new Error("Nome e ID do usuário são obrigatórios para criar uma pessoa.");
  }

  return prisma.pessoa.create({
    data: dadosPessoa
  });
};

const atualizarPessoa = async (id, dadosParaAtualizar) => {
  const pessoaExistente = await prisma.pessoa.findUnique({
    where: { id },
  });

  if (!pessoaExistente) {
    throw new Error("Pessoa não encontrada!");
  }

  return prisma.pessoa.update({
    where: {
      id: id
    },
    data: dadosParaAtualizar
  });
};

const deletarPessoa = async (id) => {
  const pessoaExistente = await prisma.pessoa.findUnique({
    where: { id },
  });

  if (!pessoaExistente) {
    throw new Error("Pessoa não encontrada!");
  }

  return prisma.pessoa.delete({
    where: {
      id: id
    },
  });
};

module.exports = {
  listarPessoas,
  buscarPessoaPorId,
  criarPessoa,
  atualizarPessoa,
  deletarPessoa
};