const prisma = require('../generated/prisma');
const bcrypt = require('bcryptjs');

const senhaHash = async (senha) => {
    return senhaHash = await bcrypt.hash(senha, 10);
}

const listarUsuarios = async() => {
    return prisma.usuario.findMany ({
        /*
            'findMany' -> Obter todos os registros, A consulta findMany() a seguir retorna todos os registros:User
            https://www.prisma.io/docs/orm/prisma-client/queries/crud#create
        */
        orderBy: {
            id: "desc"
        }
    });
};

const buscarUsuarioPorId = async(id) => {
    return prisma.usuario.findUnique({ 
        /*
         'findUnique' -> As consultas acima retornam um único 
         registro (findUnique()) por identificador exclusivo ou ID:
         https://www.prisma.io/docs/orm/prisma-client/queries/crud#create
        */
        where: {
            id
        }
    });
};

const criarUsuario = async(email, senha, nome_usuario) => {
    if (!email || !senha) {
        throw new Error("Email e senha são obrigatórios");
        
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const tipo = ( // Protótipo para um usuário ser do tipo ADMIN
        email === "feirasolidaria@email.com" 
        ? "ADMIN" : "COMUM"
    );

    return prisma.usuario.create({
        /*
            'create' -> A consulta acima cria (create()) um único usuário com dois campos:
            https://www.prisma.io/docs/orm/prisma-client/queries/crud#create
        */
        data: {
            email,
            senha: senhaHash,
            tipo,
            nome_usuario 
        }
        // connectOrCreate - para relacionamentos
    });
};

const atualizarUsuario = async(id, email, senha, tipo, nome_usuario) => {
    const usuario = await prisma.usuario.findUnique({
        where: {
            id
        },
    });

    if (!usuario) {
        throw new Error("Esse USUÁRIO não foi encontrado!");  
    } 

    if (email && email !== usuario.email){
        const emailExistente = await prisma.usuario.findUnique({
            where:  {
                email
            },
        });

        if (emailExistente) {
            throw new Error("Esse e-mail já está em uso.");
        }
    }

    if (senha !== null && senha !== undefined) {
        const senhaHash = await bcrypt.hash(senha, 10);
    }

    return prisma.usuario.update({
        where: {
            id
        },

        data: {
            email,
            senha: senhaHash,
            tipo,
            nome_usuario
        }
    });
};

const deletarUsuario = async(id) => {
    const usuario = await prisma.usuario.findUnique({
        /*
            Selecione um subconjunto de campos - A consulta a seguir usa para retornar os campos 
            e de um registro específico:findUnique()
        */
        where: {
            id
        },
    });

    if (!usuario) {
        throw new Error("USUÁRIO não encontrado!");
    }

    if (usuario.tipo === 'ADMIN') {
        throw new Error("O ADMIN não pode ser deletado!");
    }

    return prisma.usuario.delete({
        where: {
            id
        },
    });
};

module.exports = {
    listarUsuarios,
    buscarUsuarioPorId,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario
};