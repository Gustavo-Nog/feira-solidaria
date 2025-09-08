import api from './api';

const listarPessoas = async () => {
  try {
    const response = await api.get('/api/pessoas');
    return response.data;
  } catch (error) {
    throw new Error(`Falha ao listar as pessoas: ${error.message}`);
  }
};

const buscarPessoaPorId = async (id) => {
  try {
    const response = await api.get(`/api/pessoas/${Number(id)}`);
    return response.data;
  } catch (error) {
    throw new Error(`Falha ao buscar a pessoa: ${error.message}`);
  }
};

const criarPessoa = async (payload) => {
  try {
    const response = await api.post('/api/pessoas', payload);
    return response.data;
  } catch (error) {
    throw new Error(`Falha ao criar a pessoa: ${error.message}`);
  }
};

const atualizarPessoa = async (id, payload) => {
  try {
    const response = await api.put(`/api/pessoas/${Number(id)}`, payload);
    return response.data;
  } catch (error) {
    throw new Error(`Falha ao atualizar a pessoa: ${error.message}`);
  }
};

const deletarPessoa = async (id) => {
  try {
    const response = await api.delete(`/api/pessoas/${Number(id)}`);
    return response.data;
  } catch (error) {
    throw new Error(`Falha ao deletar a pessoa: ${error.message}`);
  }
};

const adicionarEnderecoPessoa = async (pessoaId, payload) => {
  try {
    const response = await api.post(`/api/pessoas/${Number(pessoaId)}/enderecos`, payload);
    return response.data;
  } catch (error) {
    throw new Error(`Falha ao adicionar endereço à pessoa: ${error.message}`);
  }
};

const removerEnderecoPessoa = async (pessoaId, enderecoId) => {
  try {
    const response = await api.delete(`/api/pessoas/${Number(pessoaId)}/enderecos/${Number(enderecoId)}`);
    return response.data;
  } catch (error) {
    throw new Error(`Falha ao remover endereço da pessoa: ${error.message}`);
  }
};

const listarDoacoesDaPessoa = async (pessoaId) => {
  try {
    const response = await api.get(`/api/pessoas/${Number(pessoaId)}/doacoes`);
    return response.data;
  } catch (error) {
    throw new Error(`Falha ao listar as doações da pessoa: ${error.message}`);
  }
};

export default {
  listarPessoas,
  buscarPessoaPorId,
  criarPessoa,
  atualizarPessoa,
  deletarPessoa,
  adicionarEnderecoPessoa,
  removerEnderecoPessoa,
  listarDoacoesDaPessoa,
};