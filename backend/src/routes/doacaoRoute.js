const express = require('express');
const router = express.Router();
const DoacaoModel = require('../models/doacaoModel');

// Listar todas as doações
router.get('/', async (req, res) => {
  const doacoes = await DoacaoModel.listarDoacoes();
  res.json(doacoes);
});

// Criar uma doação
router.post('/', async (req, res) => {
  const novaDoacao = await DoacaoModel.criarDoacao(req.body);
  res.json(novaDoacao);
});

module.exports = router;