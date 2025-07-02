import { useState } from 'react';
import { Link } from 'react-router-dom';
import feiraLogo from '../assets/logo-feira.jpg'; // certifique-se do caminho correto

function Login() {
  const [form, setForm] = useState({ nomeUsuario: '', password: '' });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      console.log('Email:', form.nomeUsuario);
      console.log('Senha:', form.password);
      setLoading(false);
    }, 2000);
  }

  return (
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
              Ainda não tem uma conta? <Link to="/cadastro">Criar conta</Link>
            </p>

            <form onSubmit={handleSubmit}>
              <label htmlFor="nomeUsuario">Nome de usuário</label>
              <input
                type="text"
                name="nomeUsuario"
                value={form.nomeUsuario}
                onChange={handleChange}
                className="form-control mb-3"
                required
              />

              <label htmlFor="password">Senha</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="form-control mb-3"
                required
              />

              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  id="logado"
                  className="form-check-input"
                />
                <label htmlFor="logado" className="form-check-label">
                  Mantenha-me logado
                </label>
              </div>

              <div className="mb-3">
                <Link to="/redefinir-senha">Esqueci a senha</Link>
              </div>

              <button
                type="submit"
                className="btn btn-warning w-100"
                disabled={loading}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
