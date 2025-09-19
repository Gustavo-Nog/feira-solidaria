const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');

router.get('/total-usuarios', usuarioController.totalUsuariosHandler);
router.get('/', usuarioController.listarUsuariosHandler);
router.get('/:id', usuarioController.buscarUsuarioPorIdHandler);
router.post('/', usuarioController.criarUsuarioHandler);
router.put('/:id', usuarioController.atualizarUsuarioHandler);
router.delete('/:id', usuarioController.deletarUsuarioHandler);

module.exports = router;