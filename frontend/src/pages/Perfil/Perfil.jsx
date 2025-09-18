import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import Button from '../../components/Button/Button';
import pessoaServices from '../../services/pessoaServices';
import './Perfil.css';

const Perfil = () => {
  const navigate = useNavigate();
  const { usuario, logout, loading: authLoading } = useUser();

  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({});

  const carregarPerfil = useCallback(async () => {
    if (authLoading || !usuario) {
      return;
    }
    try {
      setLoading(true);
      const dados = await pessoaServices.buscarPessoaPorId(usuario.pessoaId);
      setPerfil(dados);
      setForm(dados);
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
    } finally {
      setLoading(false);
    }
  }, [usuario, authLoading]);

  useEffect(() => {
    carregarPerfil();
  }, [carregarPerfil]);


  const handleSalvar = async (e) => {
    e.preventDefault();
    try {
      const perfilAtualizado = await pessoaServices.atualizarPessoa(perfil.id, form);
      setPerfil(perfilAtualizado);
      setEditando(false);
      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar o perfil:", error);
      alert("Não foi possível salvar as alterações.");
    }
  };
  
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

  if (authLoading || loading) {
    return <div className="perfil-container text-center"><h2>A carregar...</h2></div>;
  }

  if (!perfil) {
     return (
        <div className="perfil-container text-center">
            <p>Não foi possível carregar o perfil. Por favor, tente fazer o login novamente.</p>
            <Button onClick={() => navigate('/login')}>Ir para o Login</Button>
        </div>
     );
  }

  return (
    <div className="perfil-container">
      {editando ? (
        <form onSubmit={handleSalvar} className="perfil-form">
          <img className="perfil-foto" src={form.foto || 'https://placehold.co/150'} alt="Foto do usuário" />
          <input
            type="text" name="nome" value={form.nome || ''}
            onChange={handleChange} placeholder="Nome"
            className="perfil-input" required
          />
          <input
            type="email" name="email" value={perfil.usuario.email}
            readOnly className="perfil-input-readonly"
            title="O email não pode ser alterado."
          />
          <input type="file" accept="image/*" onChange={handleImageChange} className="perfil-input" />
          <div className="perfil-actions">
            <Button type="submit">Salvar</Button>
            <Button type="button" className="btn-secondary" onClick={() => setEditando(false)}>Cancelar</Button>
          </div>
        </form>
      ) : (
        <>
          <img className="perfil-foto" src={perfil.foto || 'https://placehold.co/150'} alt="Foto do usuário" />
          <h2>{perfil.nome}</h2>
          <p>{perfil.usuario.email}</p>
          <div className="perfil-actions">
            <Button className="perfil-editar" onClick={() => setEditando(true)}>Editar Perfil</Button>
            <Button className="btn-danger" onClick={() => { logout(); navigate('/login'); }}>Sair</Button>
          </div>
          
          <Link to="/cadastrar-itens" className="d-block w-100 mt-3">
            <Button className="btn-success w-100">Cadastrar Novo Item</Button>
          </Link>
          
          <div className="meus-itens mt-4">
            <h3>Meus Itens</h3>
            <ul>
              {perfil.produtos && perfil.produtos.length > 0 ? (
                perfil.produtos.map((item) => (
                  <li key={item.id} className="item-card">
                    <strong>{item.nomeProduto}</strong> - {item.categoria?.nomeCategoria || 'Sem categoria'}
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