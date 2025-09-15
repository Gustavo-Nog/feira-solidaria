import api from './api';

const listarFavoritos = async (pessoaId) => {
  try {
    const response = await api.get(`/api/favoritos?pessoaId=${pessoaId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Falha ao listar os favoritos: ${error.message}`);
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

const deletarFavorito = async (pessoaId, produtoId) => {
  try {
    const response = await api.delete(`/api/favoritos?pessoaId=${pessoaId}&produtoId=${produtoId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Falha ao deletar o favorito: ${error.message}`);
  }
};

export default {
  listarFavoritos,
  criarFavorito,
  deletarFavorito,
};