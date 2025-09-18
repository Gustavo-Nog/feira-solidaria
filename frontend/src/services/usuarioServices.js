import api from './api';

const listarUsuarios = async () => {
  try {
    const response = await api.get('/api/usuarios');
    return response.data;
  } catch (error) {
    throw new Error(`Falha ao listar os usuários: ${error.message}`);
  }
};

const buscarUsuario = async(id) => {
  try {
    const response = await api.get(`/api/usuarios/${Number(id)}`);
    return response.data;
  } catch(error) {
    throw new Error(`Falha ao buscar o usuário: ${error.message}`);
  }
};

const criarUsuario = async (payload) => {
  try {
    const response = await api.post('/api/usuarios', payload);
    return response.data;
  } catch (error) {
    throw new Error(`Falha ao criar o usuário: ${error.message}`);
  }
};

const atualizarUsuario = async(id, payload) => {
  try {
    const response = await api.put(`/api/usuarios/${Number(id)}`, payload);
    return response.data;
  } catch (error) {
    throw new Error(`Falha ao atualizar o usuário: ${error.message}`);
  }
};

const deletarUsuario = async(id) => {
  try {
    const response = await api.delete(`/api/usuarios/${Number(id)}`);
    return response.data;
  } catch(error) {
    throw new Error(`Falha ao deletar o usuário: ${error.message}`);
  }
};

const totalUsuarios = async () => {
  try {
    const response = await api.get('/api/total-usuarios'); 
    return response.data;
  }  catch (error) { 
    throw new Error(`Falha ao obter o total de usuários: ${error.message}`);
  }
};  

export default {
  listarUsuarios,
  buscarUsuario,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario,
  totalUsuarios
};