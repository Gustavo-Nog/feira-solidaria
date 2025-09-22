import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import InputField from '../../components/Input/InputField';
import Button from '../../components/Button/Button';

import produtoService from '../../services/produtoServices';
import categoriaService from '../../services/categoriaServices';
import telefoneService from '../../services/telefoneService';
import enderecoService from '../../services/enderecoServices';
import { qualidadeOptions, statusOptions } from '../Admin/ProdutosAdmin/ProdutosAdmin';

import './Cadastro-item.css';

const tipoTelefoneOptions = [
  { value: 'CELULAR', label: 'Celular' },
  { value: 'FIXO', label: 'Fixo' },
  { value: 'COMERCIAL', label: 'Comercial' }
];

function CadastrarItem() {
  const methods = useForm({
    defaultValues: {
      nomeProduto: '',
      descricao: '',
      qualidade: 'NOVO',
      status: 'DISPONIVEL',
      categoriaId: '',
      quantidade: 1,
      numeroTelefone: '',
      tipoTelefone: 'CELULAR',
      cep: '',
      uf: '',
      cidade: '',
      bairro: '',
      logradouro: '',
      numeroResidencia: ''
    }
  });
  
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagem, setImagem] = useState(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await categoriaService.listarCategorias();
        setCategorias(response);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };
    fetchCategorias();
  }, []);

  const handleImagem = (e) => {
    setImagem(e.target.files[0]);
    methods.setValue('imagemUrl', e.target.files[0]);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      
      const dadosProduto = {
        nomeProduto: data.nomeProduto,
        descricao: data.descricao,
        qualidade: data.qualidade,
        status: data.status,
        categoriaId: parseInt(data.categoriaId),
        quantidade: parseInt(data.quantidade)
      };
      
      formData.append('dados', JSON.stringify(dadosProduto));
      
      if (imagem) {
        formData.append('imagemUrl', imagem);
      }

      const produtoResponse = await produtoService.criarProduto(formData);
      
      if (data.numeroTelefone) {
        const telefoneData = {
          numero: data.numeroTelefone,
          tipo: data.tipoTelefone
        };

      }

      if (data.cep || data.cidade) {
        const enderecoData = {
          cep: data.cep,
          uf: data.uf,
          cidade: data.cidade,
          bairro: data.bairro,
          logradouro: data.logradouro,
          numeroResidencia: data.numeroResidencia
        };
        await enderecoService.criarEndereco(enderecoData);
      }

      alert('Item cadastrado com sucesso!');
      console.log('Resposta do backend:', produtoResponse);
      navigate('/perfil');
    } catch (error) {
      console.error('Erro ao cadastrar item:', error);
      alert('Erro ao cadastrar item. Verifique o console.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/perfil');
  };

  const categoriaOptions = categorias.map(categoria => ({
    value: categoria.id,
    label: categoria.nomeCategoria
  }));

  return (
    <FormProvider {...methods}>
      <div className="formulario-container container py-4">
        <h2 className="text-center text-uppercase fw-bold mb-4">Cadastro de Item </h2>

        <form className="formulario" onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="formulario-grid">
            <div className="coluna-esquerda">
              <h3>Informações do Produto</h3>
              
              <InputField
                name="nomeProduto"
                label="Nome do Produto:"
                required
              />

              <InputField
                as="select"
                name="categoriaId"
                label="Categoria:"
                required
                options={categoriaOptions}
              />

              <InputField
                as="textarea"
                name="descricao"
                label="Descrição:"
                required
                rows={3}
              />

              <InputField
                as="select"
                name="qualidade"
                label="Qualidade:"
                required
                options={qualidadeOptions}
              />

              <InputField
                as="select"
                name="status"
                label="Status:"
                required
                options={statusOptions}
              />

              <InputField
                name="quantidade"
                label="Quantidade:"
                type="number"
                required
                min="1"
              />

              <InputField
                name="imagemUrl"
                label="Foto do Produto:"
                type="file"
                accept="image/*"
                onChange={handleImagem}
              />
            </div>

            <div className="coluna-direita">
              <h3>Informações de Contato</h3>
              
              <InputField
                name="numeroTelefone"
                label="Telefone:"
                placeholder="(99) 99999-9999"
              />

              <InputField
                as="select"
                name="tipoTelefone"
                label="Tipo de Telefone:"
                options={tipoTelefoneOptions}
              />

              <h3>Endereço</h3>

              <InputField
                name="cep"
                label="CEP:"
                placeholder="12345-678"
              />

              <InputField
                name="uf"
                label="UF:"
                placeholder="SP"
                maxLength="2"
              />

              <InputField
                name="cidade"
                label="Cidade:"
              />

              <InputField
                name="bairro"
                label="Bairro:"
              />

              <InputField
                name="logradouro"
                label="Logradouro:"
              />

              <InputField
                name="numeroResidencia"
                label="Número:"
              />
            </div>
          </div>

          <div className="botoes-container">
            <Button
              type="button"
              className="btn-danger"
              onClick={handleCancel}
              loading={loading}
            >
              Cancelar
            </Button>
            
            <Button
              type="submit"
              className="btn-success"
              loading={loading}
            >
              Cadastrar Item
            </Button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}

export default CadastrarItem;