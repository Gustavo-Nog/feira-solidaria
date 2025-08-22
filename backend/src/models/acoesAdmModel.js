const prisma = require('../generated/prisma');

const listarAcoesAdm = async () => {
    return prisma.acoesadm.findMany();({
        orderBy: {
            id: "desc"
        }   
    })

};

const buscarAcoesAdmPorId = async (id) => {
    return prisma.acoesadm.findUnique({
        where: {
            id
        }
    });
};

const buscarAcoesPorUsuario = async (idDoUsuario) => {
    return prisma.acoesadm.findMany({
        where: {
            usuarioId: idDoUsuario
        }
    });
};

const criarAcaoAdm = async (dadosAcaoAdm) => {
  if (!dadosAcaoAdm.descricao || !dadosAcaoAdm.usuarioId) {
    throw new Error("Descrição e ID do usuário são obrigatórios para criar uma ação.");
  }

    return prisma.acoesadm.create({
        data: dadosAcaoAdm
    });
};

const atualizarAcaoAdm = async (id, dadosParaAtualizar) => {
    const acaoAdmExistente = await prisma.acoesadm.findUnique({
        where: {
            id
        }
    });
    
    if (!acaoAdmExistente) {
        throw new Error("Ação administrativa não encontrada!");
    }

    return prisma.acoesadm.update({
        where: {
            id
        },
        data: dadosParaAtualizar
    });
};

const deletarAcaoAdm = async (id) => {
    const acaoAdmExistente = await prisma.acoesadm.findUnique({
        where: {
            id
        }
    });

    if (!acaoAdmExistente) {
        throw new Error("Ação administrativa não encontrada!");
    }

    return prisma.acoesadm.delete({
        where: {
            id
        },
    });
};

module.exports = {
    listarAcoesAdm,
    buscarAcoesAdmPorId,
    buscarAcoesPorUsuario,
    criarAcaoAdm,
    atualizarAcaoAdm,
    deletarAcaoAdm
};
