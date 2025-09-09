import api from './api';

const solicitarDoacao = async (dadosDoacao) => {
  try {
    const response = await api.post('/solicitar', dadosDoacao);
    return response.data;
  } catch (error) {
    console.error("Erro ao solicitar doação:", error);
    throw error;
  }
};

const buscarDoacaoPorId = async (id) => {
  try {
    const response = await api.get(`/doacoes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar doação:", error);
    throw error;
  }
};

const atualizarStatusDoacao = async (id, novoStatus) => {
  try {
    const response = await api.put(`/doacoes/${id}/status`, { status: novoStatus });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar status da doação:", error);
    throw error;
  }
};

export default {
  solicitarDoacao,
  buscarDoacaoPorId,
  atualizarStatusDoacao,
};
