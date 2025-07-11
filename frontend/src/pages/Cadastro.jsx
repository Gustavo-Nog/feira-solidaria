import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { Link } from 'react-router-dom';
import feiraLogo from '../assets/logo-feira.jpg'; // certifique-se do caminho correto


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
      <div className="container-fluid p-0 m-0">
        <div className="row g-0 w-100 vh-100">
          <div className="col-md-6 d-flex align-items-center justify-content-center bg-verde-personalizado text-light">
            <div className="w-75">
              <h1 className="mb-3">Cadastro de Usuários</h1>
              <p>
                Já tem conta? <Link to="/login" className="text-warning">Fazer Login</Link>
              </p>

              <form onSubmit={handleSubmit}>
                <div>
                  <label>Nome de Usuário</label>
                  <input
                    type="text"
                    value={nomeUsuario}
                    onChange={(e) => setNomeUsuario(e.target.value)}
                    className="form-control mb-3"
                    required
                  />
                </div>
                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control mb-3"
                    required
                  />
                </div>
                <div>
                  <label>Senha</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control mb-3"
                    required
                  />
                </div>
                <div>
                  <label>Confirme a senha</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-control mb-3"
                    required
                  />
                </div>

                <Button type="submit" loading={loading}>
                  Cadastrar
                </Button>
              </form >
            </div>
          </div>

          <div className="col-md-6 d-none d-md-block position-relative p-0">
            <img
              src={feiraLogo}
              alt="Feira de Trocas"
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>

    </>
  );
}

export default Cadastro;
