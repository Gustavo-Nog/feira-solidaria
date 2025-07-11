import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import feiraLogo from '../assets/logo-feira.jpg'; // certifique-se do caminho correto

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    if (data.nomeUsuario === "Feira" && data.senha === "123456") {
      alert("Login bem-sucedido!");
      navigate("/");
    } else {
      alert("Credenciais inválidas.");
    }
  }

  return (
    <>
      <div className="container-fluid p-0 m-0">
        <div className="row g-0 w-100 vh-100">
          {/* Coluna da imagem */}
          <div className="col-md-6 d-none d-md-block position-relative p-0">
            <img
              src={feiraLogo}
              alt="Feira de Trocas"
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Coluna do formulário */}
          <div className="col-md-6 d-flex align-items-center justify-content-center bg-verde-personalizado text-light">
            <div className="w-75">
              <h1 className="mb-3">Bem-vindo!</h1>
              <p>
                Ainda não tem uma conta? <Link to="/cadastro" className="text-warning">Criar conta</Link>
              </p>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="nomeUsuario">Nome de usuário</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("nomeUsuario", { required: "Nome de usuário é obrigatório" })}
                  />
                  {errors.nomeUsuario && <span className="text-danger">{errors.nomeUsuario.message}</span>}
                </div>

                <div className="mb-3">
                  <label htmlFor="senha">Senha</label>
                  <input
                    type="password"
                    className="form-control"
                    {...register("senha", { required: "Senha é obrigatória" })}
                  />
                  {errors.senha && <span className="text-danger">{errors.senha.message}</span>}
                </div>

                <div className="form-check mb-3">
                  <input type="checkbox" id="logado" className="form-check-input" />
                  <label htmlFor="logado" className="form-check-label">
                    Mantenha-me logado
                  </label>
                </div>

                <div className="mb-3">
                  <Link to="/redefinir-senha" className="text-warning">Esqueci a senha</Link>
                </div>

                <Button type="submit" loading={loading}>
                  Entrar
                </Button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export default Login;
