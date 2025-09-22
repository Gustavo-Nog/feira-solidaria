const prisma = require('../generated/prisma');


const listarProdutosPaginado = async (pagina = 1, porPagina = 12, pessoaIdExcluir = null, filtros = {}) => {
  const skip = (pagina - 1) * porPagina;

  const where = {};

  if (pessoaIdExcluir) {
    where.pessoaId = { not: pessoaIdExcluir };
  }

  if (filtros.busca) {
    where.nomeProduto = {
      contains: filtros.busca,
      mode: 'insensitive',
    };
  }

  if (filtros.categoriaId) {
    where.categoriaId = parseInt(filtros.categoriaId);
  }

  if (filtros.qualidade) {
    where.qualidade = filtros.qualidade;
  }

  const [produtos, totalProdutos] = await prisma.$transaction([
    prisma.produto.findMany({
      where,
      skip,
      take: porPagina,
      orderBy: { dataCadastro: 'desc' },
      include: {
        categoria: true,
        pessoa: { select: { nome: true } },
      },
    }),
    prisma.produto.count({ where }),
  ]);

  return {
    produtos,
    totalPaginas: Math.ceil(totalProdutos / porPagina),
  };
};

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
    include: {
      categoria: true,
      pessoa: {
        select: { nome: true }
      }
    }
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

const totalProdutos = async () => {
  return prisma.produto.count({});
};

module.exports = {
    listarProdutos: listarProdutosPaginado,
    buscarProdutoPorId,
    criarProduto,
    atualizarProduto,
    deletarProduto,
    totalProdutos
}