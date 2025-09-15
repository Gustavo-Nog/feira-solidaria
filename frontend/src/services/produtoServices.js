import api from "./api";

const listarProdutos = async () => {
  try {
<<<<<<< HEAD:frontend/src/services/produtoServices.js
    const response = await api.get("/api/produtos");   
    return response.data;
=======
    const res = await api.get("/api/produtos");   
    return res.data;
>>>>>>> developer:frontend/src/services/produtoService.js
  } catch (error) {
    throw new Error(`Falha ao listar produtos: ${error.message}`);
  }
};

const buscarProduto = async (id) => {
  try {
<<<<<<< HEAD:frontend/src/services/produtoServices.js
    const response = await api.get(`/api/produtos/${Number(id)}`); 
    return response.data;
=======
    const res = await api.get(`/api/produtos/${Number(id)}`); 
    return res.data;
>>>>>>> developer:frontend/src/services/produtoService.js
  } catch (error) {
    throw new Error(`Falha ao buscar produto: ${error.message}`);
  }
};

const criarProduto = async (payload) => {
  try {
<<<<<<< HEAD:frontend/src/services/produtoServices.js
    const response = await api.post("/api/produtos", payload);
    return response.data;
=======
    const res = await api.post("/api/produtos", payload);
    return res.data;
>>>>>>> developer:frontend/src/services/produtoService.js
  } catch (error) {
    throw new Error(`Falha ao criar produto: ${error.message}`);
  }
};

const atualizarProduto = async (id, payload) => {
  try {
<<<<<<< HEAD:frontend/src/services/produtoServices.js
    const response = await api.put(`/api/produtos/${Number(id)}`, payload);
    return response.data;
=======
    const res = await api.put(`/api/produtos/${Number(id)}`, payload);
    return res.data;
>>>>>>> developer:frontend/src/services/produtoService.js
  } catch (error) {
    throw new Error(`Falha ao atualizar produto: ${error.message}`);
  }
};

const deletarProduto = async (id) => {
  try {
<<<<<<< HEAD:frontend/src/services/produtoServices.js
    const response = await api.delete(`/api/produtos/${Number(id)}`);
    return response.data;
=======
    const res = await api.delete(`/api/produtos/${Number(id)}`);
    return res.data;
>>>>>>> developer:frontend/src/services/produtoService.js
  } catch (error) {
    throw new Error(`Falha ao deletar produto: ${error.message}`);
  }
};

export default {
  listarProdutos,
  buscarProduto,
  criarProduto,
  atualizarProduto,
  deletarProduto,
};

