import api from './api';

const login = async ({nomeUsuario, senha}) => {
  try {
      const response = await api.post('/api/auth/login', {nomeUsuario, senha});
      return response.data;
  } catch (error) {
      throw new Error(`Falha ao tentar o login: ${error.message}`);
  }
}

const logout = async () => {
  try {
    const response = await api.post('/api/auth/logout');
    return response.data;
  } catch (error) {
    throw new Error(`Falha ao tentar o logout: ${error.message}`);
  }
}

const verificarToken = async () => {
  try {
    const response = await api.get('/api/auth/verificar-token');
    return response.data;
  } catch (error) {
    throw new Error(`Falha na verificação do token: ${error.message}`);
  }
};

export default {
  verificarToken,
  login,
  logout
};