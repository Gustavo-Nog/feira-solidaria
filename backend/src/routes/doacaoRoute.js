const express = require('express');
const router = express.Router();
const doacaoController = require('../controllers/doacaoController');

// Rota para solicitar uma nova doação
router.post('/', doacaoController.solicitarDoacao);

// Rota para listar doações (opcionalmente com filtros)
router.get('/', doacaoController.listarDoacoes);

// Rota para listar doações de um usuário específico
router.get('/usuario/:usuarioId', doacaoController.listarDoacoesPorUsuario);

// Rota para atualizar o status de uma doação
router.put('/:doacaoId/status', doacaoController.atualizarStatusDoacao);

// Rota para deletar uma doação
router.delete('/:doacaoId', doacaoController.deletarDoacao);

module.exports = router;