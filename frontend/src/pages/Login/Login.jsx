import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Button from '../../components/Button/Button';
import GoogleLoginButton from '../../components/LoginGoogle/GoogleLoginButton';
import InputField from '../../components/Input/InputField'; // caminho do seu novo InputField
import feiraLogo from '../../assets/logo-feira.jpg';

import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // useForm hook principal
  const methods = useForm();

  const onSubmit = (data) => {
    console.log(data);
    if (data.nomeUsuario === 'Feira' && data.senha === '123456') {
      alert('Login bem-sucedido!');
      navigate('/');
    } else {
      alert('Credenciais inválidas.');
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

          {/* FormProvider permite usar useFormContext nos filhos */}
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

              <div className="form-check mb-3">
                <input className="form-check-input" type="checkbox" id="logado" />
                <label className="form-check-label" htmlFor="logado">
                  Mantenha-me logado
                </label>
              </div>

              <div className="form-link">
                <Link to="/redefinir-senha" className="text-warning text-decoration-underlin">
                  Esqueci a senha
                </Link>
              </div>

              <Button type="submit" loading={loading} size="large">
                Entrar
              </Button>

              <div className="my-3 d-flex align-items-center">
                <hr className="flex-grow-1" />
                <span className="mx-2 text-white text-uppercase small">ou</span>
                <hr className="flex-grow-1" />
              </div>

              <GoogleLoginButton />
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

export default Login;
