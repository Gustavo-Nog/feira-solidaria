import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

import Button from '../../components/Button/Button';
import GoogleLoginButton from '../../components/LoginGoogle/GoogleLoginButton';
import InputField from '../../components/Input/InputField';
import feiraLogo from '../../assets/logo-feira.jpg';

import './Login.css';

import loginServices from '../../services/authServices';

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login } = useUser();
  const methods = useForm();

  const onSubmit = async (data) => {
    try {
	    console.log(data);
      const response = await loginServices.login({
				nomeUsuario: data.nomeUsuario,
				senha: data.senha
			});

			if (response.tokenDeAcesso) {
				login(response);

				  if (response.usuario.usuario.tipo === "ADMIN") {
            navigate("/dashboard");
          } else {
            navigate("/");
          }
			} else {
			}
    } catch (error) {
			console.error('Erro ao fazer o login:', error.message);
    }    
  };

  return (
    <div className="login-container">
      <div className="image-section">
        <img src={feiraLogo} alt="Feira de Trocas" className="login-image" />
      </div>

      <div className="form-section">
        <div className="form-wrapper">
          <h1>Bem-vindo!</h1>
          <p>
            Ainda não tem uma conta? <Link to="/cadastro" className="text-warning">Criar conta</Link>
          </p>

          <FormProvider {...methods}>
            <form noValidate onSubmit={methods.handleSubmit(onSubmit)}>

              <InputField
                name="nomeUsuario"
                label="Nome de usuário"
                required="Nome de usuário é obrigatório"
              />

              <InputField
                name="senha"
                label="Senha"
                type="password"
                required="Senha é obrigatória"
              />

              <div className="form-link">
                <Link to="/redefinir-senha" className="text-warning text-decoration-underlin">
                  Esqueci a senha
                </Link>
              </div>
              
              <GoogleLoginButton />
              <Button type="submit" loading={loading} size="large">
                Entrar
              </Button>

              <div className="my-3 d-flex align-items-center">
                <hr className="flex-grow-1" />
                <hr className="flex-grow-1" />
              </div>

            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

export default Login;