const mensagensModel = require('../models/mensagemModel');

const listarMensagens = async (req, res) => {
  try {
    const mensagens = await mensagemModel.listarMensagens();
    res.status(200).json(mensagens);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// Buscar mensagem por ID
const buscarMensagemPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const mensagem = await mensagemModel.buscarMensagemPorId(Number(id));
    res.status(200).json(mensagem);
  } catch (error) {
    res.status(404).json({ erro: error.message });
  }
};

// Criar mensagem
const criarMensagem = async (req, res) => {
  try {
    const novaMensagem = await mensagemModel.criarMensagem(req.body);
    res.status(201).json(novaMensagem);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

// Atualizar mensagem
const atualizarMensagem = async (req, res) => {
  try {
    const { id } = req.params;
    const mensagemAtualizada = await mensagemModel.atualizarMensagem(Number(id), req.body);
    res.status(200).json(mensagemAtualizada);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

// Deletar mensagem
const deletarMensagem = async (req, res) => {
  try {
    const { id } = req.params;
    await mensagemModel.deletarMensagem(Number(id));
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ erro: error.message });
  }
};

module.exports = {
  listarMensagens,
  buscarMensagemPorId,
  criarMensagem,
  atualizarMensagem,
  deletarMensagem
};