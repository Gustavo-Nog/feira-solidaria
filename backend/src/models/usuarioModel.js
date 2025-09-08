const prisma = require('../generated/prisma');
const bcrypt = require('bcryptjs');

const listarUsuarios = async () => {
    return prisma.usuario.findMany({
        orderBy: { 
          id: 'asc' 
        }
    });
};

const buscarUsuarioPorId = async (id) => {
    return prisma.usuario.findUnique({
        where: { 
          id 
        }
    });
};

const criarUsuario = async (dadosUsuario) => {
    if (!dadosUsuario.email || !dadosUsuario.senha) {
        throw new Error("Email e senha são obrigatórios");
    }

    const senhaHash = await bcrypt.hash(dadosUsuario.senha, 10);

    const tipo = (dadosUsuario.email === "feirasolidaria@email.com") ? "ADMIN" : "COMUM";

    return prisma.usuario.create({
        data: {
            email: dadosUsuario.email,
            senha: senhaHash,
            tipo,
            nomeUsuario: dadosUsuario.nomeUsuario
        }
    });
};

const atualizarUsuario = async (id, dadosParaAtualizar) => {
    const usuarioExistente = await prisma.usuario.findUnique({ where: { 
        id
      }
    });

    if (!usuarioExistente) {
        throw new Error("Usuário não encontrado");
    }

    if (dadosParaAtualizar.email && dadosParaAtualizar.email !== usuarioExistente.email) {
        const emailExistente = await prisma.usuario.findUnique({
          where: { 
            email: dadosParaAtualizar.email 
          } 
        });
        if (emailExistente) throw new Error("Esse e-mail já está em uso");
    }

    if (dadosParaAtualizar.senha) {
        dadosParaAtualizar.senha = await bcrypt.hash(dadosParaAtualizar.senha, 10);
    }

    return prisma.usuario.update({
        where: { id },
        data: dadosParaAtualizar
    });
};

// 
const deletarUsuario = async (id) => {
    const usuarioExistente = await prisma.usuario.findUnique({ where: { id } 
    });

    if (!usuarioExistente) 
    throw new Error("Usuário não encontrado");
    
    if (usuarioExistente.tipo === 'ADMIN') 
    throw new Error("O ADMIN não pode ser deletado");

    return prisma.usuario.delete({ where: { id } });
};

module.exports = {
    listarUsuarios,
    buscarUsuarioPorId,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario
};