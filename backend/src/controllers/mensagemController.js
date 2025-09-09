const mensagemModel = require('../models/mensagemModel');

const listarMensagensHandler = async (req, res) => {
  try {
    const mensagens = await mensagemModel.listarMensagens();
    res.status(200).json(mensagens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const buscarMensagemPorIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const mensagem = await mensagemModel.buscarMensagemPorId(parseInt(id));

    if (!mensagem) {
      return res.status(404).json({ error: 'Mensagem não encontrada' });
    }
    res.status(200).json(mensagem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const criarMensagemHandler = async (req, res) => {
  try {
    const dadosMensagem = req.body;
    const novaMensagem = await mensagemModel.criarMensagem(dadosMensagem);
    res.status(201).json(novaMensagem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const atualizarMensagemHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const dadosParaAtualizar = req.body;
    const mensagemAtualizada = await mensagemModel.atualizarMensagem(parseInt(id), dadosParaAtualizar);
    res.status(200).json(mensagemAtualizada);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deletarMensagemHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await mensagemModel.deletarMensagem(parseInt(id));
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  listarMensagensHandler,
  buscarMensagemPorIdHandler,
  criarMensagemHandler,
  atualizarMensagemHandler,
  deletarMensagemHandler
};
