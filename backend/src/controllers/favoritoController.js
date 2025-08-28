const favoritoService = require('../models/favoritoService');

const listarFavoritosHandler = async (req, res) => {
  try {
    const favoritos = await favoritoService.listarFavoritos();
    res.json(favoritos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

const buscarFavoritoPorIdHandler = async (req, res) => {
  try {
    const favorito = await favoritoService.buscarFavoritoPorId(Number(req.params.id));
    if (!favorito) return res.status(404).json({ erro: "Favorito não encontrado" });
    res.json(favorito);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

const criarFavoritoHandler = async (req, res) => {
  try {
    const novoFavorito = await favoritoService.criarFavorito(req.body);
    res.status(201).json(novoFavorito);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

const deletarFavoritoHandler = async (req, res) => {
  try {
    await favoritoService.deletarFavorito(Number(req.params.id));
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

module.exports = {
    listarFavoritosHandler,
    buscarFavoritoPorIdHandler,
    criarFavoritoHandler,
    deletarFavoritoHandler
}