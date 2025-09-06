const doacaoModel = require('../models/doacaoModel');

const solicitarDoacaoHandler = async (req, res) => {
  try {
    const { receptorId, produtoId } = req.body;
    const novaDoacao = await doacaoModel.solicitarDoacao(receptorId, produtoId);
    res.status(201).json(novaDoacao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const listarDoacoesPorPessoaHandler = async (req, res) => {
  try {
    const { pessoaId } = req.params;
    const doacoes = await doacaoModel.listarDoacoesPorPessoa(parseInt(pessoaId));
    res.status(200).json(doacoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const buscarDoacaoPorIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const doacao = await doacaoModel.buscarDoacaoPorId(parseInt(id));
    if (!doacao) {
      return res.status(404).json({ error: 'Doação não encontrada' });
    }
    res.status(200).json(doacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const atualizarStatusDoacaoHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { novoStatus, usuarioQueAtualizaId } = req.body;
    const doacaoAtualizada = await doacaoModel.atualizarStatusDoacao(parseInt(id), novoStatus, usuarioQueAtualizaId);
    res.status(200).json(doacaoAtualizada);
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

module.exports = {
  solicitarDoacaoHandler,
  listarDoacoesPorPessoaHandler,
  buscarDoacaoPorIdHandler,
  atualizarStatusDoacaoHandler,
};
