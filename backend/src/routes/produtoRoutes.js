const express = require('express');
const router = express.Router();

const produtoController = require('../controllers/produtoController');

router.get('/', produtoController.listarProdutosHandler);
router.get('/:id', produtoController.buscarProdutoPorIdHandler);
router.post('/', produtoController.criarProdutoHandler);
router.put('/:id', produtoController.atualizarProdutoHandler);
router.delete('/:id', produtoController.deletarProdutoHandler);

module.exports = router;