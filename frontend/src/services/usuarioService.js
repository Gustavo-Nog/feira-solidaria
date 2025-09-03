import api from './api';

const listarUsuarios = async () => {
  try {
    const res = await api.get('/usuarios');
    return res.data;
  } catch (error) {
    throw new Error(`Falha ao listar os usuários: ${error.message}`);
  }
};

const buscarUsuario = async(id) => {
  try {
    const res = await api.get(`/usuario/${Number(id)}`);
    return res.data;
  } catch(error) {
    throw new Error(`Falha ao buscar o usuário: ${error.message}`);
  }
};

const criarUsuario = async (payload) => {
  try {
    const res = await api.post('/usuarios', payload);
    return res.data;
  } catch (error) {
    throw new Error(`Falha ao criar o usuário: ${error.message}`);
  }
};

const atualizarUsuario = async(id, payload) => {
  try {
    const res = await api.put(`/usuario/${Number(id)}`, payload);
    return res.data;
  } catch (error) {
    throw new Error(`Falha ao atualizar o usuário: ${error.message}`);
  }
};

const deletarUsuario = async(id) => {
  try {
    const res = await api.delete(`/usuario/${Number(id)}`);
    return res.data;
  } catch(error) {
    throw new Error(`Falha ao deletar o usuário: ${error.message}`);
  }
};

export default {
  listarUsuarios,
  buscarUsuario,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario
};