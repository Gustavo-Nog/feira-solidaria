const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const MensagemModel = {
  async criarMensagem(data) {
    return await prisma.mensagem.create({ data });
  },

  async listarMensagens() {
    return await prisma.mensagem.findMany();
  },

  async buscarPorId(id) {
    return await prisma.mensagem.findUnique({ where: { id } });
  },

  async atualizarMensagem(id, data) {
    return await prisma.mensagem.update({ where: { id }, data });
  },

  async deletarMensagem(id) {
    return await prisma.mensagem.delete({ where: { id } });
  }
};

module.exports = MensagemModel;
