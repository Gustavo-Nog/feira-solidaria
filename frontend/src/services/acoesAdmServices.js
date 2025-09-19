import api from './api';

const listarAcoesAdm = async () => {
    try {
        const response = await api.get('/api/acoesAdm');
        return response.data;
    } catch (error) {
        throw new Error(`Falha ao listar as ações: ${error.message}`);
    }
};

const buscarAcoesAdmPorId = async (id) => {
    try {
        const response = await api.get(`/api/acoesAdm/${Number(id)}`);
        return response.data;
    } catch (error) {
        throw new Error(`Falha ao buscar ação: ${error.message}`);
    }
};

const buscarAcoesPorUsuario = async (id) => {
    try {
        const response = await api.get(`/api/acoesAdm/usuario/${Number(id)}`);
        return response.data;
    } catch (error) {
        throw new Error(`Falha ao buscar ações do usuário: ${error.message}`);
    }
};

const criarAcaoAdm = async (payload) => {
    try {
        const response = await api.post('/api/acoesAdm', payload);
        return response.data;
    } catch (error) {
        throw new Error(`Falha ao criar ação: ${error.message}`);
    }
};
 
const atualizarAcaoAdm = async (id, payload) => {
    try {
        const response = await api.put(`/api/acoesAdm/${Number(id)}`, payload);
        return response.data;
    } catch (error) {
        throw new Error(`Falha ao atualizar ação: ${error.message}`);
    }
};

const deletarAcaoAdm = async (id) => {
    try {
        const response = await api.delete(`/api/acoesAdm/${Number(id)}`);
        return response.data;
    } catch (error) {
        throw new Error(`Falha ao deletar ação: ${error.message}`);
    }
};

export default { 
    listarAcoesAdm,
    buscarAcoesAdmPorId,
    buscarAcoesPorUsuario,
    criarAcaoAdm,
    atualizarAcaoAdm,
    deletarAcaoAdm
 };