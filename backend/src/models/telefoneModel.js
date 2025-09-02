const telefoneModel = require('../models/telefoneModel');

const prisma = require('../generated/prisma');

const criarTelefoneHandler = async (req, res) => {
  try {
    const { id } = req.params; // id da pessoa
    const novoTelefone = await telefoneModel.criarTelefone(parseInt(id), req.body);
    res.status(201).json(novoTelefone);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const listarTelefonesHandler = async (req, res) => {
  try {
    const { id } = req.params; // id da pessoa
    const telefones = await telefoneModel.listarTelefonesPorPessoa(parseInt(id));
    res.status(200).json(telefones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const atualizarTelefoneHandler = async (req, res) => {
  try {
    const { id } = req.params; // id do telefone
    const telefoneAtualizado = await telefoneModel.atualizarTelefone(parseInt(id), req.body);
    res.status(200).json(telefoneAtualizado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deletarTelefoneHandler = async (req, res) => {
  try {
    const { id } = req.params; // id do telefone
    await telefoneModel.deletarTelefone(parseInt(id));
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  criarTelefoneHandler,
  listarTelefonesHandler,
  atualizarTelefoneHandler,
  deletarTelefoneHandler,
};