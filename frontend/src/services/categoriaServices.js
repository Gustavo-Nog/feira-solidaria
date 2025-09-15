import api from './api';

const listarCategorias = async () => {
    try {
        const response = await api.get('/api/categorias');
        return response.data;
    } catch (error) {
        throw new Error(`Falha ao listar as categorias: ${error.message}`);
    }
};

const buscarCategoriaPorId = async (id) => {
    try {
        const response = await api.get(`/api/categorias/${Number(id)}`);
        return response.data;
    } catch (error) {
        throw new Error(`Falha ao buscar a categoria: ${error.message}`);
    }
};

const criarCategoria = async (payload) => {
    try {
        const response = await api.post('/api/categorias', payload);
        return response.data;
    } catch (error) {
        throw new Error(`Falha ao criar a categoria: ${error.message}`);
    }
};

const atualizarCategoria = async (id, payload) => {
    try {
        const response = await api.put(`/api/categorias/${Number(id)}`, payload);
        return response.data;
    } catch (error) {
        throw new Error(`Falha ao atualizar a categoria: ${error.message}`);
    }
};

const deletarCategoria = async (id) => {
    try {
        const response = await api.delete(`/api/categorias/${Number(id)}`);
        return response.data;
    } catch (error) {
        throw new Error(`Falha ao deletar a categoria: ${error.message}`);
    }
};

export default {
    listarCategorias,
    buscarCategoriaPorId,
    criarCategoria,
    atualizarCategoria,
    deletarCategoria
};