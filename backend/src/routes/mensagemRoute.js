const express = require('express');
const router = express.Router();
const mensagemController = require('../controllers/mensagemController');

// Listar todas as mensagens
router.get('/', mensagemController.listarMensagens);

// Buscar mensagem por ID
router.get('/:id', mensagemController.buscarMensagemPorId);

// Criar nova mensagem
router.post('/', mensagemController.criarMensagem);

// Atualizar mensagem por ID
router.put('/:id', mensagemController.atualizarMensagem);

// Deletar mensagem por ID
router.delete('/:id', mensagemController.deletarMensagem);

module.exports = router;
