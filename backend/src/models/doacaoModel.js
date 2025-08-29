const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const DoacaoModel = {
  async criarDoacao(data) {
    return await prisma.doacao.create({ data });
  },

  async listarDoacoes() {
    return await prisma.doacao.findMany();
  },

  async buscarPorId(id) {
    return await prisma.doacao.findUnique({ where: { id } });
  },

  async atualizarDoacao(id, data) {
    return await prisma.doacao.update({ where: { id }, data });
  },

  async deletarDoacao(id) {
    return await prisma.doacao.delete({ where: { id } });
  }
};

module.exports = DoacaoModel;
