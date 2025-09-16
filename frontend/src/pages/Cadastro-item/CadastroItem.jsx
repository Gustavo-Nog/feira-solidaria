import { useForm, FormProvider } from 'react-hook-form';
import InputField from '../../components/Input/InputField';
import { useNavigate } from 'react-router-dom';
import produtoService from '../../services/produtoServices';
import './Cadastro-item.css';

function CadastrarItem() {
  const methods = useForm();
  const navigate = useNavigate();

   const onSubmit = async (data) => {
    try {
      const response = await produtoService.criarProduto(data); 
      alert('Item cadastrado com sucesso!');
      console.log('Resposta do backend:', response);
      navigate('/perfil'); 
    } catch (error) {
      console.error('Erro ao cadastrar item:', error);
      alert('Erro ao cadastrar item. Verifique o console.');
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="formulario-container">
        <h2>Cadastro de Item - Feira Solidária</h2>
        <form className="formulario" onSubmit={methods.handleSubmit(onSubmit)}>

          {/* Nome do Produto */}
          <InputField
            name="nome"
            label="Nome do Produto:"
            required
          />

          {/* Categoria */}
          <InputField
            as="select"
            name="categoria"
            label="Categoria:"
            required
            options={[

              { value: 'Folha', label: 'Folha' },
              { value: 'Talo', label: 'Talo' },
              { value: 'legume', label: 'Legume' },
              { value: 'Outro', label: 'Outro' },
            ]}
          />

          {/* Localização */}
          <InputField
            name="localizacao"
            label="Localização (Bairro ou Cidade):"
            required
          />

          {/* Descrição */}
          <InputField
            as="textarea"
            name="descricao"
            label="Descrição:"
            required
            rows={3}
          />

          {/* Qualidade */}
          <InputField
            as="select"
            name="qualidade"
            label="Qualidade:"
            required
            options={[

              { value: 'otima', label: 'Ótima' },
              { value: 'Boa', label: 'Boa' },
              { value: 'regular', label: 'Regular' },
            ]}
          />
          
          {/* Telefone */}
          <InputField
              name="telefone"
             label="Telefone:"
             required="O telefone é obrigatório."
            placeholder="(99) 99999-9999"
            />
          <button type="submit" className="botao">
            Cadastrar Item
          </button>
        </form>
      </div>
    </FormProvider>
  );
}

export default CadastrarItem;
