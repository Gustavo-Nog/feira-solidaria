const favoritoModel = require('../models/favoritoModel');

const criarFavoritoHandler = async (req, res) => {
  try {
    const novoFavorito = await favoritoModel.criarFavorito(req.body);
    res.status(201).json(novoFavorito);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const listarFavoritosHandler = async (req, res) => {
    try {
        const pessoaId = parseInt(req.query.pessoaId);
        if (!pessoaId) {
            return res.status(400).json({ error: 'pessoaId é obrigatório.' });
        }
        const favoritos = await favoritoModel.listarFavoritosPorPessoa(pessoaId);
        res.status(200).json(favoritos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deletarFavoritoHandler = async (req, res) => {
  try {
    const pessoaId = parseInt(req.query.pessoaId);
    const produtoId = parseInt(req.query.produtoId);

    if (!pessoaId || !produtoId) {
        return res.status(400).json({ error: 'pessoaId e produtoId são obrigatórios.' });
    }

    await favoritoModel.deletarFavorito(pessoaId, produtoId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  criarFavoritoHandler,
  listarFavoritosHandler,
  deletarFavoritoHandler,
};