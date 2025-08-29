
const prisma = require('../generated/prisma');

const listarFavoritos = async () => {
  return prisma.favorito.findMany({
    include: {
      pessoa: true,
      produto: true
    },
    orderBy: {
      dataAdicao: "desc"
    }
  });
};

const buscarFavoritoPorId = async (id) => {
  return prisma.favorito.findUnique({
    where: { id },
    include: {
      pessoa: true,
      produto: true
    }
  });
};

const criarFavorito = async (dadosFavorito) => {
  if (!dadosFavorito.pessoaId || !dadosFavorito.produtoId) {
    throw new Error("PessoaId e ProdutoId são obrigatórios para criar um favorito.");
  }
  return prisma.favorito.create({
  data: {
    ...dadosFavorito,
    dataAdicao: new Date()
  },
  include: {
    pessoa: true,
    produto: true
    }
  });
};

const deletarFavorito = async (id) => {
  const favoritoExistente = await prisma.favorito.findUnique({ where: { id } });

  if (!favoritoExistente) {
    throw new Error("Favorito não encontrado!");
  }

  return prisma.favorito.delete({ where: { id } });
};

module.exports = {
    listarFavoritos,
    buscarFavoritoPorId,
    criarFavorito,
    deletarFavorito
};