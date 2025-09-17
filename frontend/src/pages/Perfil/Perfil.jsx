import './Perfil.css';
import { useUser } from '../../context/UserContext';
import Button from '../../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const usuarioLogado = false;//true se voce quiser testar como se o perfil estivesse logado

const Perfil = () => {
  const navigate = useNavigate();
  const { usuario, setUsuario } = useUser();
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({ ...usuario });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    // Se o usuário NÃO estiver logado, redireciona para a página de login
    if (!usuarioLogado) {
      navigate('/login');
    }
  }, [navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, foto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSalvar = (e) => {
    e.preventDefault();
    setUsuario(form);
    setEditando(false);
  };

  return (
    <div className="perfil-container">
      {editando ? (
        <form onSubmit={handleSalvar}>
          <img className="perfil-foto" src={form.foto} alt="Foto do usuário" />
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            placeholder="Nome"
            className="perfil-input"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="perfil-input"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="perfil-input"
          />
          <Button type="submit" className="perfil-editar">Salvar</Button>
          <Button type="button" className="perfil-editar" onClick={() => setEditando(false)}>Cancelar</Button>
        </form>
      ) : (
        <>
          <img className="perfil-foto" src={usuario.foto} alt="Foto do usuário" />
          <h2>{usuario.nome}</h2>
          <p>{usuario.email}</p>
          <Button className="perfil-editar" onClick={() => setEditando(true)}>Editar Perfil</Button>
          <Link to="/cadastrar-itens" className="d-block w-100 mt-2">
            <Button className="btn-success">Cadastrar Novo Item</Button>
          </Link>
            <div className="meus-itens mt-4">
            <h3>Meus Itens</h3>
            <ul>
              {usuario.itens && usuario.itens.length > 0 ? (
                usuario.itens.map((item) => (
                  <li key={item.id} className="item-card">
                    <strong>{item.nome}</strong> - {item.categoria}
                    <p>{item.descricao}</p>

                    <Link to={`/editar-item/${item.id}`}>
                      <Button className="btn-warning mt-2">Editar Item</Button>
                    </Link>
                  </li>
                ))
              ) : (
                <p>Você ainda não cadastrou nenhum item.</p>
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Perfil;
   
