const acoesAdmModel = require('../models/acoesAdmModel');

const listarAcoesAdmHandler = async (req, res) => {
    try {
        const acoesAdm = await acoesAdmModel.listarAcoesAdm();
        res.status(200).json(acoesAdm);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const buscarAcoesAdmPorIdHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const acoesAdm = await acoesAdmModel.buscarAcoesAdmPorId(parseInt(id));

        if (!acoesAdm) {
            return res.status(404).json({ error: 'Ação administrativa não encontrada' });
        }
        res.status(200).json(acoesAdm);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const buscarAcoesAdmPorUsuarioHandler = async (req, res) => {
    const usuarioId = parseInt(req.params.usuarioId)
    try {
        const acoesAdm = await acoesAdmModel.buscarAcoesPorUsuario(usuarioId);

        if (!acoesAdm) {
            return res.status(404).json({ error: 'Ações administrativas do usuário nao encontradas' });
        }
        res.status(200).json(acoesAdm);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const criarAcaoAdmHandler = async (req, res) => {
    try {
        const dadosAcaoAdm = req.body;
        const novaAcaoAdm = await acoesAdmModel.criarAcaoAdm(dadosAcaoAdm);
        res.status(201).json(novaAcaoAdm);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const atualizarAcaoAdmHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const dadosParaAtualizar = req.body;
        const acaoAdmAtualizada = await acoesAdmModel.atualizarAcaoAdm(parseInt(id), dadosParaAtualizar);
        res.status(200).json(acaoAdmAtualizada);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const deletarAcaoAdmHandler = async (req, res) => {
    try {
        const { id } = req.params;
        await acoesAdmModel.deletarAcaoAdm(parseInt(id));
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

module.exports = {
    listarAcoesAdmHandler,
    buscarAcoesAdmPorIdHandler,
    buscarAcoesAdmPorUsuarioHandler,
    criarAcaoAdmHandler,
    atualizarAcaoAdmHandler,
    deletarAcaoAdmHandler
};
