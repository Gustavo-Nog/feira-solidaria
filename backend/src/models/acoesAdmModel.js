const prisma = require('../generated/prisma');

const listarAcoesAdm = async () => {
    return prisma.acaoAdministrativa.findMany({
        orderBy: {
            id: "desc"
        }   
    })

};

const buscarAcoesAdmPorId = async (id) => {
    return prisma.acaoAdministrativa.findUnique({
        where: {
            id
        }
    });
};

const buscarAcoesPorUsuario = async (idDoUsuario) => {
    return prisma.acaoAdministrativa.findMany({
        where: {
            usuarioId: idDoUsuario
        }
    });
};

const criarAcaoAdm = async (dadosAcaoAdm) => {
  if (!dadosAcaoAdm.usuarioId) {
    throw new Error("ID do usuário é obrigatório para criar uma ação.");
  }
  return prisma.acaoAdministrativa.create({
    data: dadosAcaoAdm
  });
};

const atualizarAcaoAdm = async (id, dadosParaAtualizar) => {
    const acaoAdmExistente = await prisma.acaoAdministrativa.findUnique({
        where: {
            id
        }
    });
    
    if (!acaoAdmExistente) {
        throw new Error("Ação administrativa não encontrada!");
    }

    return prisma.acaoAdministrativa.update({
        where: {
            id
        },
        data: dadosParaAtualizar
    });
};

const deletarAcaoAdm = async (id) => {
    const acaoAdmExistente = await prisma.acaoAdministrativa.findUnique({
        where: {
            id
        }
    });

    if (!acaoAdmExistente) {
        throw new Error("Ação administrativa não encontrada!");
    }

    return prisma.acaoAdministrativa.delete({
        where: {
            id
        },
    });
};

const totalAcoesAdm = async () => {
    return prisma.acaoAdministrativa.count({});
};

module.exports = {
    listarAcoesAdm,
    buscarAcoesAdmPorId,
    buscarAcoesPorUsuario,
    criarAcaoAdm,
    atualizarAcaoAdm,
    deletarAcaoAdm,
    totalAcoesAdm
};
