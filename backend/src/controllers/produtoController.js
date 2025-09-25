const produtoModel = require('../models/produtoModel');

const listarProdutosHandler = async (req, res) => {
  try {
    const { pagina, busca, categoriaId, qualidade } = req.query;
    const pessoaId = req.usuario?.pessoaId || null;

    const filtros = { busca, categoriaId, qualidade };

    const resultado = await produtoModel.listarProdutos(
      parseInt(pagina) || 1,
      8,
      pessoaId,
      filtros
    );
    res.status(200).json(resultado);
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
    if (!req.body || !req.body.dados) {
      return res.status(400).json({ error: 'Campo `dados` ausente no corpo da requisição.' });
    }

    let dadosProduto;
    try {
      dadosProduto = JSON.parse(req.body.dados);
    } catch (parseError) {
      return res.status(400).json({ error: 'Formato inválido em `dados`. Deve ser JSON válido.' });
    }

    if (req.usuario && req.usuario.pessoaId) {
      dadosProduto.pessoaId = dadosProduto.pessoaId || req.usuario.pessoaId;
    }

    if (dadosProduto.categoriaId !== undefined) {
      dadosProduto.categoriaId = Number(dadosProduto.categoriaId);
    }
    if (dadosProduto.quantidade !== undefined) {
      dadosProduto.quantidade = Number(dadosProduto.quantidade) || 1;
    }

    if (req.file) {
      const filePath = `/uploads/${req.file.filename}`;
      dadosProduto.imagemUrl = filePath;
    }

    const novoProduto = await produtoModel.criarProduto(dadosProduto);
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const atualizarProdutoHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const dadosParaAtualizar = req.body.dados
      ? JSON.parse(req.body.dados)
      : req.body;

    if (req.file) {
      const filePath = `/uploads/${req.file.filename}`;
      dadosParaAtualizar.imagemUrl = filePath;
    }

    const produtoAtualizado = await produtoModel.atualizarProduto(
      parseInt(id),
      dadosParaAtualizar
    );

    if (!produtoAtualizado) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.status(200).json(produtoAtualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
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

const totalProdutosHandler = async(req, res) => {
  try {
    const total = await produtoModel.totalProdutos();
    res.status(200).json({ totalProdutos: total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listarProdutosHandler,
  buscarProdutoPorIdHandler,
  criarProdutoHandler,
  totalProdutosHandler,
  atualizarProdutoHandler,
  deletarProdutoHandler
};
