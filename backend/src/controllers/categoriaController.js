const categoriaModel = require('../models/categoriaModel');

const listarCategoriasHandler = async (req, res) => {
    try {
        const categorias = await categoriaModel.listarCategorias();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const buscarCategoriaPorIdHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const categoria = await categoriaModel.buscarCategoriaPorId(parseInt(id));

        if (!categoria) {
            return res.status(404).json({ error: 'Categoria nao encontrada' });
        }
        res.status(200).json(categoria);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const criarCategoriaHandler = async (req, res) => {
    try {
        const dadosCategoria = req.body;
        const novaCategoria = await categoriaModel.criarCategoria(dadosCategoria);
        res.status(201).json(novaCategoria);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const atualizarCategoriaHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const dadosParaAtualizar = req.body;
        const categoriaAtualizada = await categoriaModel.atualizarCategoria(parseInt(id), dadosParaAtualizar);
        res.status(200).json(categoriaAtualizada);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const deletarCategoriaHandler = async (req, res) => {
    try {
        const { id } = req.params;
        await categoriaModel.deletarCategoria(parseInt(id));
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

totalCategoriasHandler = async (req, res) => {
    try {
        const totalCategorias = await categoriaModel.listarCategorias();
        res.status(200).json(totalCategorias);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

module.exports = {
   listarCategoriasHandler, 
   buscarCategoriaPorIdHandler, 
   criarCategoriaHandler, 
   atualizarCategoriaHandler, 
   deletarCategoriaHandler, 
   totalCategoriasHandler
};