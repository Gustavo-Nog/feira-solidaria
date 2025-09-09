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
  return prisma.telefone.findMany({ where: { pessoaId: pessoaId } });
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

module.exports = {
  adicionarTelefone,
  listarTelefonesPorPessoa,
  atualizarTelefone,
  deletarTelefone,
};