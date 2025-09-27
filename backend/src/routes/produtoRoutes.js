const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const produtoController = require('../controllers/produtoController');
const optionalAuthMiddleware = require('../middleware/optionalAuthMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

const armazenamento = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', '..', 'uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage: armazenamento });

router.get('/total-produtos', produtoController.totalProdutosHandler);
router.get('/', optionalAuthMiddleware, produtoController.listarProdutosHandler);
router.get('/:id', produtoController.buscarProdutoPorIdHandler);
router.post('/', authMiddleware, upload.single('imagemUrl'), produtoController.criarProdutoHandler);
router.put('/:id', authMiddleware, upload.single('imagemUrl'),  produtoController.atualizarProdutoHandler);
router.delete('/:id', authMiddleware, produtoController.deletarProdutoHandler);

module.exports = router;
