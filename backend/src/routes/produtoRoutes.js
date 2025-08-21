const exports = require('express');
const produtoController = exports.Router();
const produtoController = require('../controllers/produtoController');

router.get('/produtos', produtoController.listarProdutosHandler);
router.get('/produtos/:id', produtoController.buscarProdutoPorIdHandler);
router.post('/produtos', produtoController.criarProdutoHandler);
router.put('/produtos/:id', produtoController.atualizarProdutoHandler);
router.delete('/produtos/:id', produtoController.deletarProdutoHandler);

module.exports = router;