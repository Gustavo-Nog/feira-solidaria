import api from './api';

const listarCategorias = async () => {
    try {
        const res = await api.get('/categorias');
        return res.data;
    } catch (error) {
        throw new Error(`Falha ao listar as categorias: ${error.message}`);
    }
};

const buscarCategoriaPorId = async (id) => {
    try {
        const res = await api.get(`/categorias/${Number(id)}`);
        return res.data;
    } catch (error) {
        throw new Error(`Falha ao buscar a categoria: ${error.message}`);
    }
};

const criarCategoria = async (payload) => {
    try {
        const res = await api.post('/categorias', payload);
        return res.data;
    } catch (error) {
        throw new Error(`Falha ao criar a categoria: ${error.message}`);
    }
};

const atualizarCategoria = async (id, payload) => {
    try {
        const res = await api.put(`/categorias/${Number(id)}`, payload);
        return res.data;
    } catch (error) {
        throw new Error(`Falha ao atualizar a categoria: ${error.message}`);
    }
};

const deletarCategoria = async (id) => {
    try {
        const res = await api.delete(`/categorias/${Number(id)}`);
        return res.data;
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