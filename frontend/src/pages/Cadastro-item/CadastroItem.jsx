import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import InputField from '../../components/Input/InputField';
import Button from '../../components/Button/Button';
import { useUser } from '../../context/UserContext';

import produtoService from '../../services/produtoServices';
import categoriaService from '../../services/categoriaServices';
import { qualidadeOptions, statusOptions } from '../Admin/ProdutosAdmin/ProdutosAdmin';

import './Cadastro-item.css';

function CadastrarItem() {
  const methods = useForm({
    defaultValues: {
      nomeProduto: '',
      descricao: '',
      qualidade: 'NOVO',
      status: 'DISPONIVEL', 
      categoriaId: '',
      quantidade: 1,
    }
  });
  
  const navigate = useNavigate();
  const { usuario } = useUser();
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
      if (!usuario || !usuario.id) {
        alert('Usuário não autenticado ou perfil incompleto. Faça login para cadastrar um produto.');
        return;
      }

      const formData = new FormData();
      
      const dadosProduto = {
        nomeProduto: data.nomeProduto,
        descricao: data.descricao,
        categoriaId: Number(data.categoriaId),
        quantidade: Number(data.quantidade),
        qualidade: data.qualidade?.toUpperCase(),
        status: data.status?.toUpperCase(),
        pessoaId: usuario.id
      };
      
      formData.append('dados', JSON.stringify(dadosProduto));
      
      if (imagem) {
        formData.append('imagemUrl', imagem);
      }

      const response = await produtoService.criarProduto(formData);
      alert('Item cadastrado com sucesso!');
      console.log('Resposta do backend:', response);
      navigate('/perfil');
    } catch (error) {
      console.error('Erro ao cadastrar item:', error);
      alert(`Erro ao cadastrar item: ${error.message}`);
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

			    		<InputField
                as="textarea"
                name="descricao"
                label="Descrição:"
                required
                rows={3}
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