const prisma = require('../generated/prisma');

const listarCategorias = async () => {
    return prisma.categoria.findMany({
        orderBy: {
            nomeCategoria: "asc"
        }   
    });
};

const buscarCategoriaPorId = async (id) => {
    return prisma.categoria.findUnique({
        where: {
            id
        },
        include: {  
            produtos: true
        }
    });
};

const criarCategoria = async (dadosCategoria) => {
    if (!dadosCategoria.nomeCategoria) {
        throw new Error("Nome da categoria é obrigatório.");
    }
    
    return prisma.categoria.create({
        data: dadosCategoria
    });
};
const atualizarCategoria = async (id, dadosParaAtualizar) => {
    const categoriaExistente = await prisma.categoria.findUnique({
        where: {
            id
        }
    });

    if (!categoriaExistente) {
        throw new Error("Categoria nao encontrada!");
    }

    return prisma.categoria.update({
        where: {
            id
        },
        data: dadosParaAtualizar
    });
};

const deletarCategoria = async (id) => {
    const categoriaExistente = await prisma.categoria.findUnique({
        where: {
            id
        }
    });

    if (!categoriaExistente) {
        throw new Error("Categoria nao encontrada!");
    }

    return prisma.categoria.delete({
        where: {
            id
        }
    });
};

module.exports = { 
listarCategorias,
buscarCategoriaPorId,
criarCategoria,
atualizarCategoria,
deletarCategoria
};