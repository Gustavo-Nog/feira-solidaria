const telefoneModel = require('../models/telefoneModel');

const adicionarTelefoneHandler = async (req, res) => {
  try {
    const { pessoaId } = req.params;
    const novoTelefone = await telefoneModel.adicionarTelefone(parseInt(pessoaId), req.body);
    res.status(201).json(novoTelefone);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const listarTelefonesHandler = async (req, res) => {
  try {
    const { pessoaId } = req.params;
    const telefones = await telefoneModel.listarTelefonesPorPessoa(parseInt(pessoaId));
    res.status(200).json(telefones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const atualizarTelefoneHandler = async (req, res) => {
  try {
    const { telefoneId } = req.params;
    const telefoneAtualizado = await telefoneModel.atualizarTelefone(parseInt(telefoneId), req.body);
    res.status(200).json(telefoneAtualizado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deletarTelefoneHandler = async (req, res) => {
  try {
    const { telefoneId } = req.params;
    await telefoneModel.deletarTelefone(parseInt(telefoneId));
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  adicionarTelefoneHandler,
  listarTelefonesHandler,
  atualizarTelefoneHandler,
  deletarTelefoneHandler,
};