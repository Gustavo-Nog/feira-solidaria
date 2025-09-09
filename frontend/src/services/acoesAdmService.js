import api from './api';

const listarAcoesAdm = async () => {
    try {
        const res = await api.get('/acoesAdm');
        return res.data;
    } catch (error) {
        throw new Error(`Falha ao listar as ações: ${error.message}`);
    }
};

const buscarAcoesAdmPorId = async (id) => {
    try {
        const res = await api.get(`/acoesAdm/${Number(id)}`);
        return res.data;
    } catch (error) {
        throw new Error(`Falha ao buscar ação: ${error.message}`);
    }
};

const buscarAcoesPorUsuario = async (id) => {
    try {
        const res = await api.get(`/acoesAdm/usuario/${Number(id)}`);
        return res.data;
    } catch (error) {
        throw new Error(`Falha ao buscar ações do usuário: ${error.message}`);
    }
};

const criarAcaoAdm = async (payload) => {
    try {
        const res = await api.post('/acoesAdm', payload);
        return res.data;
    } catch (error) {
        throw new Error(`Falha ao criar ação: ${error.message}`);
    }
};

const atualizarAcaoAdm = async (id, payload) => {
    try {
        const res = await api.put(`/acoesAdm/${Number(id)}`, payload);
        return res.data;
    } catch (error) {
        throw new Error(`Falha ao atualizar ação: ${error.message}`);
    }
};

const deletarAcaoAdm = async (id) => {
    try {
        const res = await api.delete(`/acoesAdm/${Number(id)}`);
        return res.data;
    } catch (error) {
        throw new Error(`Falha ao deletar ação: ${error.message}`);
    }
};

export { 
    listarAcoesAdm,
    buscarAcoesAdmPorId,
    buscarAcoesPorUsuario,
    criarAcaoAdm,
    atualizarAcaoAdm,
    deletarAcaoAdm
 };