const pessoaModel = require('../models/pessoaModel');

const listarPessoasHandler = async (req, res) => {
  try {
    const pessoas = await pessoaModel.listarPessoas();
    res.status(200).json(pessoas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const buscarPessoaPorIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const pessoa = await pessoaModel.buscarPessoaPorId(parseInt(id));

    if (!pessoa) {
      return res.status(404).json({ error: 'Pessoa não encontrada' });
    }
    res.status(200).json(pessoa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const criarPessoaHandler = async (req, res) => {
  try {
    const dadosPessoa = req.body;
    const novaPessoa = await pessoaModel.criarPessoa(dadosPessoa);
    res.status(201).json(novaPessoa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const atualizarPessoaHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const dadosParaAtualizar = req.body;
    const pessoaAtualizada = await pessoaModel.atualizarPessoa(parseInt(id), dadosParaAtualizar);
    res.status(200).json(pessoaAtualizada);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deletarPessoaHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await pessoaModel.deletarPessoa(parseInt(id));
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  listarPessoasHandler,
  buscarPessoaPorIdHandler,
  criarPessoaHandler,
  atualizarPessoaHandler,
  deletarPessoaHandler,
};