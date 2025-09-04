import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';

import Button from '../../components/Button/Button';
import GoogleLoginButton from '../../components/LoginGoogle/GoogleLoginButton';
import InputField from '../../components/Input/InputField';
import feiraLogo from '../../assets/logo-feira.jpg';

import usuarioServices from '../../services/usuarioServices';

import './Cadastro.css';

function Cadastro() {
  const navigate = useNavigate();
  const methods = useForm();
  const { handleSubmit, formState: { isSubmitting } } = methods;

  const onSubmit = async (data) => {
    try {
      const response =  await usuarioServices.criarUsuario({
        nome_usuario: data.nomeUsuario,
        email: data.email,
        senha: data.password
      });
          console.log(`Usuário ${response.nome_usuario} cadastrado com sucesso!`, response);
      navigate('/login');
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error.message);
      alert('Erro ao cadastrar usuário, tente novamente!');
    }

  };

  return (
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

                <div className="my-3 d-flex align-items-center">
                  <hr className="flex-grow-1" />
                  <span className="mx-2 text-white text-uppercase small">ou</span>
                  <hr className="flex-grow-1" />
                </div>

                <GoogleLoginButton />
              </div>
            </form>
          </FormProvider>
        </div>
      </div>

      <div className="image-section">
        <img src={feiraLogo} alt="Feira de Trocas" className="cadastro-image" />
      </div>
    </div>
  );
}

export default Cadastro;
