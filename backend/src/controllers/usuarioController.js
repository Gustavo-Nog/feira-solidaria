const usuarioModel = require('../models/usuarioModel');

// Listar todos os usuários
const listarUsuariosHandler = async (req, res) => {
    try {
        const usuarios = await usuarioModel.listarUsuarios();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const buscarUsuarioPorIdHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await usuarioModel.buscarUsuarioPorId(parseInt(id));

        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const criarUsuarioHandler = async (req, res) => {
    try {
        const dadosUsuario = req.body;
        const novoUsuario = await usuarioModel.criarUsuario(dadosUsuario);
        res.status(201).json(novoUsuario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const atualizarUsuarioHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const dadosParaAtualizar = req.body;
        const usuarioAtualizado = await usuarioModel.atualizarUsuario(parseInt(id), dadosParaAtualizar);
        res.status(200).json(usuarioAtualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deletarUsuarioHandler = async (req, res) => {
    try {
        const { id } = req.params;
        await usuarioModel.deletarUsuario(parseInt(id));
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

module.exports = {
    listarUsuariosHandler,
    buscarUsuarioPorIdHandler,
    criarUsuarioHandler,
    atualizarUsuarioHandler,
    deletarUsuarioHandler
};