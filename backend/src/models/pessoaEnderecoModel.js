const prisma = require('../prisma');
const enderecoModel = require('./enderecoModel');

const associarPessoaEndereco = async (pessoaId, dadosEndereco) => {
  // Passo 1: Usa a função do model de endereço para garantir que não há duplicados.
  const endereco = await enderecoModel.criarEndereco(dadosEndereco);

  // Passo 2: Verifica se esta pessoa já está associada a este endereço
  const associacaoExistente = await prisma.pessoaEndereco.findFirst({
    where: {
      pessoaId: pessoaId,
      enderecoId: endereco.id,
    }
  });

  if (associacaoExistente) {
    throw new Error('Esta pessoa já está associada a este endereço.');
  }

  // Passo 3: Cria a ligação na tabela 'PessoaEndereco'
  return prisma.pessoaEndereco.create({
    data: {
      pessoaId: pessoaId,
      enderecoId: endereco.id,
    },
    // Inclui os detalhes do endereço na resposta para ser mais útil
    include: {
      endereco: true
    }
  });
};

const desassociarPessoaEndereco = async (pessoaId, enderecoId) => {
  // Verifica se a associação existe antes de tentar apagar
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