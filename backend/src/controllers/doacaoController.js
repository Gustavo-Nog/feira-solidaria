const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const doacaoController = {

  // Solicitar uma nova doação
  // Rota: POST /api/doacoes
  async solicitarDoacao(req, res) {
    const { doadorId, produtoId, receptorId } = req.body;

    // Verificação básica para garantir que todos os dados foram enviados
    if (!doadorId || !produtoId || !receptorId) {
      return res.status(400).json({ error: 'Os campos doadorId, produtoId e receptorId são obrigatórios.' });
    }

    try {
      // Cria a nova doação com o status inicial 'PENDENTE'
      const novaDoacao = await prisma.doacao.create({
        data: {
          doadorId: parseInt(doadorId),
          produtoId: parseInt(produtoId),
          receptorId: parseInt(receptorId),
          status: 'PENDENTE',
          dataSolicitacao: new Date(),
        },
      });
      res.status(201).json(novaDoacao);
    } catch (error) {
      console.error('Erro ao solicitar doação:', error);
      res.status(500).json({ error: 'Erro ao solicitar doação.' });
    }
  },

  // Listar todas as doações (com opções de filtro)
  // Rota: GET /api/doacoes
  async listarDoacoes(req, res) {
    const { status, doadorId, receptorId } = req.query;

    const filtros = {};
    if (status) {
      filtros.status = status;
    }
    if (doadorId) {
      filtros.doadorId = parseInt(doadorId);
    }
    if (receptorId) {
      filtros.receptorId = parseInt(receptorId);
    }

    try {
      const doacoes = await prisma.doacao.findMany({
        where: filtros,
        include: {
          produto: true,
          doador: {
            select: { id: true, nome: true },
          },
          receptor: {
            select: { id: true, nome: true },
          },
        },
        orderBy: {
          dataSolicitacao: 'desc',
        },
      });
      res.status(200).json(doacoes);
    } catch (error) {
      console.error('Erro ao listar doações:', error);
      res.status(500).json({ error: 'Erro ao listar doações.' });
    }
  },

  // Atualizar o status de uma doação (aceitar, recusar, finalizar)
  // Rota: PUT /api/doacoes/:doacaoId/status
  async atualizarStatusDoacao(req, res) {
    const { doacaoId } = req.params;
    const { novoStatus } = req.body;

    // Validação para garantir que o novo status é válido
    const statusValidos = ['PENDENTE', 'ACEITA', 'RECUSADA', 'FINALIZADA', 'CANCELADA'];
    if (!novoStatus || !statusValidos.includes(novoStatus)) {
      return res.status(400).json({ error: `O status deve ser um dos seguintes: ${statusValidos.join(', ')}` });
    }

    try {
      const doacaoAtualizada = await prisma.doacao.update({
        where: { id: parseInt(doacaoId) },
        data: { status: novoStatus },
      });
      res.status(200).json(doacaoAtualizada);
    } catch (error) {
      console.error('Erro ao atualizar status da doação:', error);
      res.status(500).json({ error: 'Erro ao atualizar status da doação.' });
    }
  },

  // Deletar uma doação
  // Rota: DELETE /api/doacoes/:doacaoId
  async deletarDoacao(req, res) {
    const { doacaoId } = req.params;

    try {
      await prisma.doacao.delete({
        where: { id: parseInt(doacaoId) },
      });
      res.status(200).json({ message: 'Doação deletada com sucesso.' });
    } catch (error) {
      console.error('Erro ao deletar doação:', error);
      res.status(500).json({ error: 'Erro ao deletar doação.' });
    }
  },

  // Listar doações onde o usuário é o doador ou o receptor
  // Rota: GET /api/doacoes/usuario/:usuarioId
  async listarDoacoesPorUsuario(req, res) {
    const { usuarioId } = req.params;

    try {
      const doacoes = await prisma.doacao.findMany({
        where: {
          OR: [
            { doadorId: parseInt(usuarioId) },
            { receptorId: parseInt(usuarioId) }
          ]
        },
        include: {
          produto: true,
          doador: { select: { id: true, nome: true } },
          receptor: { select: { id: true, nome: true } },
        },
        orderBy: {
          dataSolicitacao: 'desc',
        },
      });
      res.status(200).json(doacoes);
    } catch (error) {
      console.error('Erro ao listar doações do usuário:', error);
      res.status(500).json({ error: 'Erro ao listar doações do usuário.' });
    }
  },
};

module.exports = doacaoController;