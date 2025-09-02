const prisma = require('../generated/prisma');

const adicionarTelefone = async (pessoaId, dadosTelefone) => {
  const { numero, tipo } = dadosTelefone;
  if (!numero || !tipo) throw new Error('Número e tipo são obrigatórios.');

  const pessoaExistente = await prisma.pessoa.findUnique({ where: { id: pessoaId } });
  if (!pessoaExistente) throw new Error('Pessoa não encontrada.');

  return prisma.telefone.create({
    data: { numero, tipo, pessoaId },
  });
};

const listarTelefonesPorPessoa = async (pessoaId) => {
  return prisma.telefone.findMany({ where: { pessoaId } });
};

const atualizarTelefone = async (telefoneId, dadosParaAtualizar) => {
  const telefoneExistente = await prisma.telefone.findUnique({ where: { id: telefoneId } });
  if (!telefoneExistente) throw new Error('Telefone não encontrado!');

  return prisma.telefone.update({
    where: { id: telefoneId },
    data: dadosParaAtualizar,
  });
};

const deletarTelefone = async (telefoneId) => {
  const telefoneExistente = await prisma.telefone.findUnique({ where: { id: telefoneId } });
  if (!telefoneExistente) throw new Error('Telefone não encontrado!');

  return prisma.telefone.delete({ where: { id: telefoneId } });
};


const listarTelefonesHandler = async (req, res) => {
  try {
    const pessoaId = parseInt(req.params.id);
    const telefones = await listarTelefonesPorPessoa(pessoaId);
    res.status(200).json(telefones);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const criarTelefoneHandler = async (req, res) => {
  try {
    const pessoaId = parseInt(req.params.id);
    const telefone = await adicionarTelefone(pessoaId, req.body);
    res.status(201).json(telefone);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const atualizarTelefoneHandler = async (req, res) => {
  try {
    const telefoneId = parseInt(req.params.id);
    const telefoneAtualizado = await atualizarTelefone(telefoneId, req.body);
    res.status(200).json(telefoneAtualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletarTelefoneHandler = async (req, res) => {
  try {
    const telefoneId = parseInt(req.params.id);
    await deletarTelefone(telefoneId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  listarTelefonesHandler,
  criarTelefoneHandler,
  atualizarTelefoneHandler,
  deletarTelefoneHandler,
  adicionarTelefone,
  listarTelefonesPorPessoa,
  atualizarTelefone,
  deletarTelefone
};
