const prisma = require('../generated/prisma');

const listarFavoritosPorPessoa = async (pessoaId) => {
  return prisma.favorito.findMany({
    where: { pessoaId: pessoaId },
    include: {
      produto: true
    },
    orderBy: {
      dataAdicao: "desc"
    }
  });
};

const criarFavorito = async (dadosFavorito) => {
  if (dadosFavorito.pessoaId == null || dadosFavorito.produtoId == null) {
    throw new Error("PessoaId e ProdutoId são obrigatórios para criar um favorito.");
  }
  return prisma.favorito.create({
    data: {
      ...dadosFavorito,
      dataAdicao: new Date()
    }
  });
};

const deletarFavorito = async (pessoaId, produtoId) => {
  const favoritoExistente = await prisma.favorito.findFirst({
    where: {
      pessoaId: pessoaId,
      produtoId: produtoId,
    },
  });

  if (!favoritoExistente) {
    throw new Error('Favorito não encontrado para este utilizador.');
  }

  return prisma.favorito.delete({
    where: {
      id: favoritoExistente.id,
    },
  });
};

module.exports = {
    listarFavoritosPorPessoa,
    criarFavorito,
    deletarFavorito
};