import api from './api';

const listarTelefonesDaPessoa = async (pessoaId) => {
  try {
    const response = await api.get(`/api/pessoas/${Number(pessoaId)}/telefones`);
    return response.data;
  } catch (error) {
    throw new Error(`Falha ao listar os telefones da pessoa: ${error.message}`);
  }
};

const adicionarTelefonePessoa = async (pessoaId, payload) => {
  try {
    const response = await api.post(`/api/pessoas/${Number(pessoaId)}/telefones`, payload);
    return response.data;
  } catch (error) {
    throw new Error(`Falha ao adicionar telefone à pessoa: ${error.message}`);
  }
};

const atualizarTelefone = async (telefoneId, payload) => {
  try {
    const response = await api.put(`/api/telefones/${Number(telefoneId)}`, payload);
    return response.data;
  } catch (error) {
    throw new Error(`Falha ao atualizar o telefone: ${error.message}`);
  }
};

const deletarTelefone = async (telefoneId) => {
  try {
    const response = await api.delete(`/api/telefones/${Number(telefoneId)}`);
    return response.data;
  } catch (error) {
    throw new Error(`Falha ao deletar o telefone: ${error.message}`);
  }
};

export default {
  listarTelefonesDaPessoa,
  adicionarTelefonePessoa,
  atualizarTelefone,
  deletarTelefone,
};