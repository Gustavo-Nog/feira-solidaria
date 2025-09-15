import api from './api';

const listarFavoritos = async () => {
  try {
    const response = await api.get('/api/favoritos');
    return response.data;
  } catch (error) {
    throw new Error(`Falha ao listar os favoritos: ${error.message}`);
  }
};

const buscarFavorito = async (id) => {
  try {
    const response = await api.get(`/api/favoritos/${Number(id)}`);
    return response.data;
  } catch (error) {
    throw new Error(`Falha ao buscar o favorito: ${error.message}`);
  }
};

const criarFavorito = async (payload) => {
  try {
    const response = await api.post('/api/favoritos', payload);
    return response.data;
  } catch (error) {
    throw new Error(`Falha ao criar o favorito: ${error.message}`);
  }
};

const atualizarFavorito = async (id, payload) => {
  try {
    const response = await api.put(`/api/favoritos/${Number(id)}`, payload);
    return response.data;
  } catch (error) {
    throw new Error(`Falha ao atualizar o favorito: ${error.message}`);
  }
};

const deletarFavorito = async (id) => {
  try {
    const response = await api.delete(`/api/favoritos/${Number(id)}`);
    return response.data;
  } catch (error) {
    throw new Error(`Falha ao deletar o favorito: ${error.message}`);
  }
};

export default {
  listarFavoritos,
  buscarFavorito,
  criarFavorito,
  atualizarFavorito,
  deletarFavorito
};
