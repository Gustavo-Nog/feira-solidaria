import api from './api';

const solicitarDoacao = async (payload) => {
  try {
    const response = await api.post('/api/doacoes/solicitar', payload);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || `Falha ao solicitar a doação: ${error.message}`);
  }
};

const buscarDoacaoPorId = async (id) => {
  try {
    const response = await api.get(`/api/doacoes/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || `Falha ao buscar a doação: ${error.message}`);
  }
};

const atualizarStatusDoacao = async (id, novoStatus, usuarioQueAtualizaId) => {
  try {
    const payload = { novoStatus, usuarioQueAtualizaId };
    const response = await api.put(`/api/doacoes/${id}/status`, payload);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || `Falha ao atualizar o status da doação: ${error.message}`);
  }
};

export default {
  solicitarDoacao,
  buscarDoacaoPorId,
  atualizarStatusDoacao,
};