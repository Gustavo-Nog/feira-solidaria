const enderecoModel = require('../models/enderecoModel');

const listarEnderecosHandler = async (req, res) => {
  try {
    const enderecos = await enderecoModel.listarEnderecos();
    res.status(200).json(enderecos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const buscarEnderecoPorIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const endereco = await enderecoModel.buscarEnderecoPorId(parseInt(id));

    if (!endereco) {
      return res.status(404).json({ error: 'Endereço não encontrado' });
    }
    res.status(200).json(endereco);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const criarEnderecoHandler = async (req, res) => {
  try {
    const dadosEndereco = req.body;
    const novoEndereco = await enderecoModel.criarEndereco(dadosEndereco);
    res.status(201).json(novoEndereco);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const atualizarEnderecoHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const dadosParaAtualizar = req.body;
    const enderecoAtualizado = await enderecoModel.atualizarEndereco(parseInt(id), dadosParaAtualizar);
    res.status(200).json(enderecoAtualizado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deletarEnderecoHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await enderecoModel.deletarEndereco(parseInt(id));
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  listarEnderecosHandler,
  buscarEnderecoPorIdHandler,
  criarEnderecoHandler,
  atualizarEnderecoHandler,
  deletarEnderecoHandler,
};