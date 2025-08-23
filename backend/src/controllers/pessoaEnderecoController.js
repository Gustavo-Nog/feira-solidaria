const pessoaEnderecoModel = require('../models/pessoaEndereco');

const associarPessoaEnderecoHandler = async (req, res) => {
  try {
    const { pessoaId } = req.params;
    const dadosEndereco = req.body;

    const novaAssociacao = await pessoaEnderecoModel.associarPessoaEndereco(parseInt(pessoaId), dadosEndereco);
    res.status(201).json(novaAssociacao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const desassociarPessoaEnderecoHandler = async (req, res) => {
  try {
    const { pessoaId, enderecoId } = req.params;
    await pessoaEnderecoModel.desassociarPessoaEndereco(parseInt(pessoaId), parseInt(enderecoId));
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  associarPessoaEnderecoHandler,
  desassociarPessoaEnderecoHandler,
};