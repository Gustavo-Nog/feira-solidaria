import api from './api';

const listarMensagens = async () => {
  try {
    const response = await api.get('/api/mensagens/');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar mensagens:", error);
    throw error;
  }
};


const buscarMensagemPorId = async (id) => {
  try {
    const response = await api.get(`/api/mensagens/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar mensagem:", error);
    throw error;
  }
};


const criarMensagem = async (payload) => {
  try {
    const response = await api.post('/api/mensagens/', payload);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar mensagem:", error);
    throw error;
  }
};

const atualizarMensagem = async (id, payload) => {
  try {
    const response = await api.put(`/api/mensagens/${id},${payload}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar mensagem:", error);
    throw error;
  }
};


const deletarMensagem = async (id) => {
  try {
    await api.delete(`/api/mensagens/${id}`);
  } catch (error) {
    console.error("Erro ao deletar mensagem:", error);
    throw error;
  }
};

export default {
    listarMensagens,
    buscarMensagemPorId,
    criarMensagem,
    atualizarMensagem,
    deletarMensagem
};