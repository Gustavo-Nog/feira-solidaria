const express = require('express');
const router = express.Router();
const MensagemModel = require('../models/mensagemModel');

// Listar todas as mensagens
router.get('/', async (req, res) => {
  const mensagens = await MensagemModel.listarMensagens();
  res.json(mensagens);
});

// Criar uma mensagem
router.post('/', async (req, res) => {
  const novaMensagem = await MensagemModel.criarMensagem(req.body);
  res.json(novaMensagem);
});

module.exports = router;
