import api from './api';

const listarEnderecos = async () => {
  try {
    const response = await api.get('/api/enderecos');
    return response.data;
  } catch (error) {
    throw new Error(`Falha ao listar os endereços: ${error.message}`);
  }
};

const buscarEnderecoPorId = async (id) => {
  try {
    const response = await api.get(`/api/enderecos/${Number(id)}`);
    return response.data;
  } catch (error) {
    throw new Error(`Falha ao buscar o endereço: ${error.message}`);
  }
};

const criarEndereco = async (payload) => {
  try {
    const response = await api.post('/api/enderecos', payload);
    return response.data;
  } catch (error) {
    throw new Error(`Falha ao criar o endereço: ${error.message}`);
  }
};

const atualizarEndereco = async (id, payload) => {
  try {
    const response = await api.put(`/api/enderecos/${Number(id)}`, payload);
    return response.data;
  } catch (error) {
    throw new Error(`Falha ao atualizar o endereço: ${error.message}`);
  }
};

const deletarEndereco = async (id) => {
  try {
    const response = await api.delete(`/api/enderecos/${Number(id)}`);
    return response.data;
  } catch (error) {
    throw new Error(`Falha ao deletar o endereço: ${error.message}`);
  }
};

export default {
  listarEnderecos,
  buscarEnderecoPorId,
  criarEndereco,
  atualizarEndereco,
  deletarEndereco,
};