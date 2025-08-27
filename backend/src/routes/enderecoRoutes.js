const express = require('express');
const router = express.Router();

const enderecoController = require('../controllers/enderecoController');

router.get('/', enderecoController.listarEnderecosHandler);
router.get('/:id', enderecoController.buscarEnderecoPorIdHandler);
router.post('/', enderecoController.criarEnderecoHandler);
router.put('/:id', enderecoController.atualizarEnderecoHandler);
router.delete('/:id', enderecoController.deletarEnderecoHandler);

module.exports = router;