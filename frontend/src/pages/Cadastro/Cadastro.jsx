import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';

import Button from '../../components/Button/Button';
import GoogleLoginButton from '../../components/LoginGoogle/GoogleLoginButton';
import InputField from '../../components/Input/InputField';
import feiraLogo from '../../assets/logo-feira.jpg';

import usuarioServices from '../../services/usuarioServices';
import PessoaModal from '../../components/PessoaModal/PessoaModal';

import './Cadastro.css';

function Cadastro() {
  const navigate = useNavigate();
  const methods = useForm();
  const { handleSubmit, watch, formState: { isSubmitting, errors } } = methods;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUserId, setNewUserId] = useState(null);

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }

    console.log('Dados do formulário de cadastro:', data);

    try {
      const response = await usuarioServices.criarUsuario({
        nomeUsuario: data.nomeUsuario,
        email: data.email,
        senha: data.password
      });

      console.log(`Usuário ${response.nomeUsuario} cadastrado com sucesso!`, response);

      setNewUserId(response.id);
      setIsModalOpen(true);

    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error.message);
      alert('Erro ao cadastrar usuário, tente novamente!');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate('/login');
  };

  return (
    <>
      <div className="cadastro-container">
        <div className="form-section">
          <div className="form-wrapper">
            <h1>Cadastro de Usuários</h1>
            <p>
              Já tem conta? <Link to="/login" className="text-warning">Fazer Login</Link>
            </p>

            <FormProvider {...methods}>
              <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <div className="form-fields">
                  <InputField
                    name="nomeUsuario"
                    label="Nome de Usuário"
                    required="Nome de usuário é obrigatório"
                  />

                  <InputField
                    name="email"
                    label="Email"
                    type="email"
                    required="Email é obrigatório"
                  />

                  <InputField
                    name="password"
                    label="Senha"
                    type="password"
                    required="Senha é obrigatória"
                  />

                  <InputField
                    name="confirmPassword"
                    label="Confirme a senha"
                    type="password"
                    required="Confirmação de senha é obrigatória"
                    className='mb-1'
                  />

                  <Button type="submit" loading={isSubmitting} size="large">
                    Cadastrar
                  </Button>

                  <GoogleLoginButton />

                  <div className="my-3 d-flex align-items-center">
                    <hr className="flex-grow-1" />
                    <span className="mx-2 text-white text-uppercase small">ou</span>
                    <hr className="flex-grow-1" />
                  </div>


                </div>
              </form>
            </FormProvider>
          </div>
        </div>

        <div className="image-section">
          <img src={feiraLogo} alt="Feira de Trocas" className="cadastro-image" />
        </div>
      </div>

      <PessoaModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        usuarioId={newUserId}
      />
    </>
  );
}

export default Cadastro;
