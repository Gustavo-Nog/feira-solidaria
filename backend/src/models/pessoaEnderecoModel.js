const prisma = require('../generated/prisma');
const enderecoModel = require('./enderecoModel');

const associarPessoaEndereco = async (pessoaId, dadosEndereco) => {
  
  const endereco = await enderecoModel.criarEndereco(dadosEndereco);

  const associacaoExistente = await prisma.pessoaEndereco.findFirst({
    where: {
      pessoaId: pessoaId,
      enderecoId: endereco.id,
    }
  });

  if (associacaoExistente) {
    throw new Error('Esta pessoa já está associada a este endereço.');
  }

  return prisma.pessoaEndereco.create({
    data: {
      pessoaId: pessoaId,
      enderecoId: endereco.id,
    },
    include: {
      endereco: true
    }
  });
};

const desassociarPessoaEndereco = async (pessoaId, enderecoId) => {

  const associacaoExistente = await prisma.pessoaEndereco.findFirst({
    where: {
      pessoaId: pessoaId,
      enderecoId: enderecoId,
    }
  });

  if (!associacaoExistente) {
    throw new Error('Associação entre pessoa e endereço não encontrada.');
  }

  return prisma.pessoaEndereco.delete({
    where: {
      id: associacaoExistente.id
    }
  });
};

module.exports = {
  associarPessoaEndereco,
  desassociarPessoaEndereco,
};