import api from './api';

const login = async (nomeUsuario, senha) => {
    try {
        const response = await api.post('/api/auth/login', {nomeUsuario, senha});
        return response.data;
    } catch (error) {
        throw new error(`Falha ao tentar o login: ${error.message}`);
    }
}

export default {
    login,
};