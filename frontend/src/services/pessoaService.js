import api from './api';

const criarPessoa = async (dadosPessoa) => {
  try {
    const response = await api.post('/pessoas', dadosPessoa);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

const pessoaServices = {
  criarPessoa,
};

export default pessoaServices;