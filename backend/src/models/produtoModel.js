const prisma = require('../generated/prisma');

const listarProdutos = async () => {
    return prisma.produto.findMany({
        orderBy: {
            nomeProduto: "asc"
        },
        include: {
          categoria: true,
          pessoa: {
            select: {
              nome: true
            }
          }
        }
    });
}

const buscarProdutoPorId = async (id) => {
  return prisma.produto.findUnique({
    where: { id },
    include: {
      categoria: true,
      doacoes: true,
      favoritos: true,
      pessoa: {
        include: {
          enderecos: {
            include: {
              endereco: true,
            }
          },
          telefones: true,
        }
      }
    },
  });
};

const criarProduto = async (dadosProduto) => {
  if (!dadosProduto.nomeProduto || !dadosProduto.categoriaId) {
    throw new Error("Nome do produto e categoria são obrigatórios.");
  }

  return prisma.produto.create({
    data: dadosProduto,
  });
};

const atualizarProduto = async (id, dadosParaAtualizar) => {
  const produtoExistente = await prisma.produto.findUnique({
    where: { id },
  });

  if (!produtoExistente) {
    throw new Error("Produto não encontrado!");
  }

  return prisma.produto.update({
    where: { id },
    data: dadosParaAtualizar,
  });
};

const deletarProduto = async (id) => {
  const produtoExistente = await prisma.produto.findUnique({
    where: { id },
  });

  if (!produtoExistente) {
    throw new Error("Produto não encontrado!");
  }

  return prisma.produto.delete({
    where: { id },
  });
};

module.exports = {
    listarProdutos,
    buscarProdutoPorId,
    criarProduto,
    atualizarProduto,
    deletarProduto
}