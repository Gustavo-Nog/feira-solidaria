import './Cadastro-item.css';
import { useForm, FormProvider } from 'react-hook-form';
import InputField from '../../components/Input/InputField';

function CadastrarItem() {
  const methods = useForm();

  const onSubmit = (data) => {
    console.log("Dados do formulário:", data);
    alert('Item cadastrado com sucesso! Verifique o console.');
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
            required="O nome do produto é obrigatório."
          />

          {/* Categoria */}
          <InputField
            as="select"
            name="categoria"
            label="Categoria:"
            required="Selecione uma categoria."
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
            required="A localização é obrigatória."
          />

          {/* Descrição */}
          <InputField
            as="textarea"
            name="descricao"
            label="Descrição:"
            required="A descrição é obrigatória."
            rows={3}
          />

          {/* Qualidade */}
          <InputField
            as="select"
            name="qualidade"
            label="Qualidade:"
            required="Selecione a qualidade."
            options={[
              
              { value: 'otima', label: 'Ótima' },
              { value: 'Boa', label: 'Boa' },
              { value: 'regular', label: 'Regular' },
            ]}
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
