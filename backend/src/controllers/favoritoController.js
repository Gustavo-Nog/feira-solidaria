const favoritoModel = require('../models/favoritoModel');

const listarFavoritosHandler = async (req, res) => {
  try {
    const favoritos = await favoritoModel.listarFavoritos();
    res.status(200).json(favoritos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const buscarFavoritoPorIdHandler = async (req, res) => {
  try {
    const favorito = await favoritoModel.buscarFavoritoPorId(Number(req.params.id));

    if (!favorito) {
      return res.status(404).json({ error: "Favorito não encontrado" });
    }

    res.status(200).json(favorito);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const criarFavoritoHandler = async (req, res) => {
  try {
    const novoFavorito = await favoritoModel.criarFavorito(req.body);
    res.status(201).json(novoFavorito);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletarFavoritoHandler = async (req, res) => {
  try {
    await favoritoModel.deletarFavorito(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
    listarFavoritosHandler,
    buscarFavoritoPorIdHandler,
    criarFavoritoHandler,
    deletarFavoritoHandler
};