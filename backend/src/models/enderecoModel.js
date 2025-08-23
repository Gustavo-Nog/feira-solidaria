const prisma = require('../generated/prisma');

const listarEnderecos = async () => {
  return prisma.endereco.findMany();
};

const buscarEnderecoPorId = async (id) => {
  return prisma.endereco.findUnique({
    where: {
      id
    }
  });
};

const criarEndereco = async (dadosEndereco) => {
  const enderecoExistente = await prisma.endereco.findFirst({
    where: {
      cep: dadosEndereco.cep,
      logradouro: dadosEndereco.logradouro,
      numeroResidencia: dadosEndereco.numeroResidencia,
    }
  });

  if (enderecoExistente) {
    return enderecoExistente;
  }

  return prisma.endereco.create({
    data: dadosEndereco
  });
};

const atualizarEndereco = async (id, dadosParaAtualizar) => {
  const enderecoExistente = await prisma.endereco.findUnique({
    where: { id },
  });

  if (!enderecoExistente) {
    throw new Error("Endereço não encontrado!");
  }

  return prisma.endereco.update({
    where: {
      id
    },
    data: dadosParaAtualizar
  });
};

const deletarEndereco = async (id) => {
  const enderecoExistente = await prisma.endereco.findUnique({
    where: { id },
  });

  if (!enderecoExistente) {
    throw new Error("Endereço não encontrado!");
  }

  return prisma.endereco.delete({
    where: {
      id
    },
  });
};

module.exports = {
  listarEnderecos,
  buscarEnderecoPorId,
  criarEndereco,
  atualizarEndereco,
  deletarEndereco
};