const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const produtoController = require('../controllers/produtoController');

const armazenamento = multer.diskStorage({
  destination: (req, arquivo, cb) => cb(null, 'uploads/'),
  filename: (req, arquivo, cb) => cb(null, Date.now() + path.extname(arquivo.originalname))
});

const upload = multer({ storage: armazenamento });

router.get('/total-produtos', produtoController.totalProdutosHandler);
router.get('/', produtoController.listarProdutosHandler);
router.get('/:id', produtoController.buscarProdutoPorIdHandler);
router.post('/', upload.single('imagem'), produtoController.criarProdutoHandler);
router.put('/:id', upload.single('imagem'),  produtoController.atualizarProdutoHandler);
router.delete('/:id', produtoController.deletarProdutoHandler);

module.exports = router;
