import React, { useState } from 'react';
import './Perfil.css';
import { useUser } from '../../context/UserContext';
import Button from '../../components/Button/Button';

const Perfil = () => {
  const { usuario, setUsuario } = useUser();
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({ ...usuario });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
        </>
      )}
    </div>
  );
};

export default Perfil;
