import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Button from "../../components/Button/Button";
import GoogleLoginButton from '../../components/GoogleLoginButton';
import feiraLogo from '../../assets/logo-feira.jpg';

import './Cadastro.css';

function Cadastro() {
  const navigate = useNavigate();
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(`Usuário ${nomeUsuario} cadastrado com sucesso!`);
    navigate("/login");
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

            <form onSubmit={handleSubmit}>
              <div className="form-fields">
                <div className="form-group">
                  <label htmlFor="nomeUsuario">Nome de Usuário</label>
                  <input
                    id="nomeUsuario"
                    type="text"
                    value={nomeUsuario}
                    onChange={(e) => setNomeUsuario(e.target.value)}
                    required
                    placeholder="Digite seu nome de usuário"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Digite seu email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Senha</label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Digite sua senha"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirme a senha</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Confirme sua senha"
                  />
                </div>

                <Button type="submit" loading={loading} size="large">
                  Cadastrar
                </Button>
                <GoogleLoginButton />

              </div>
            </form>
          </div>
        </div>

        <div className="image-section">
          <img src={feiraLogo} alt="Feira de Trocas" className="cadastro-image" />
        </div>
      </div>
    </>

  );
}

export default Cadastro;
