const produtoModel = require('../models/produtoModel');

const listarProdutosHandler = async (req, res) => {
  try {
    const produtos = await produtoModel.listarProdutos(); 
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const buscarProdutoPorIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await produtoModel.buscarProdutoPorId(parseInt(id));

    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.status(200).json(produto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const criarProdutoHandler = async (req, res) => {
  try {
    const dadosProduto = req.body;
    const novoProduto = await produtoModel.criarProduto(dadosProduto);
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const atualizarProdutoHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const dadosParaAtualizar = req.body;
    const produtoAtualizado = await produtoModel.atualizarProduto(parseInt(id), dadosParaAtualizar);
    res.status(200).json(produtoAtualizado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deletarProdutoHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await produtoModel.deletarProduto(parseInt(id));
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
    listarProdutosHandler,
    buscarProdutoPorIdHandler,
    criarProdutoHandler,
    atualizarProdutoHandler,
    deletarProdutoHandler
}