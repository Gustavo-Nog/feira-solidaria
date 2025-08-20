const { listarUsuarios, buscarUsuarioPorId, criarUsuario, atualizarUsuario, deletarUsuario} = require('../models/usuarioModel');

const listarUsuariosHandler = async(req, res) => {
    try {
        const usuarios = await listarUsuarios();
        res.status(201).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }    
};

const buscarUsuarioPorIdHandler = async(req, res) => {
    try {
        const usuarios = await buscarUsuarioPorId();
        res.status(201).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });

        
    }
}

const criarUsuarioHandler = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
}

const atualizarUsuarioHandler = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
}

const deletarUsuarioHandler = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
}

module.exports = {
    listarUsuariosHandler,
    buscarUsuarioPorIdHandler,
    criarUsuarioHandler,
    atualizarUsuarioHandler,
    deletarUsuarioHandler
};