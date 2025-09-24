import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import Button from '../../components/Button/Button';

import pessoaServices from '../../services/pessoaServices';
import produtoServices from '../../services/produtoServices';
import EnderecoModal from '../../components/EnderecoModal/enderecoModal';
import TelefoneModal from '../../components/TelefoneModal/telefoneModal';

import './Perfil.css';

const Perfil = () => {
  const navigate = useNavigate();
  const { usuario, logout, loading: authLoading } = useUser();

  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  const [isEnderecoModalOpen, setIsEnderecoModalOpen] = useState(false);
  const [isTelefoneModalOpen, setIsTelefoneModalOpen] = useState(false);

  const carregarPerfil = useCallback(async () => {
    if (authLoading || !usuario) return;
    try {
      setLoading(true);
      const dados = await pessoaServices.buscarPessoaPorId(usuario.id);
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
      setSaving(true);
      const payload = { nome: form.nome };
      await pessoaServices.atualizarPessoa(perfil.id, payload);
      await carregarPerfil();
      setEditando(false);
      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar o perfil:", error);
      alert("Não foi possível salvar as alterações.");
    } finally {
      setSaving(false);
    }
  };
  
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

	const handleDeleteItem = async (itemId) => {
		if (authLoading || loading) return;
		try {
			setLoading(true);
			await produtoServices.deletarProduto(itemId);
			alert("Item deletado com sucesso!");
			await carregarPerfil();
		} catch (error) {
			console.error("Erro ao deletar item:", error);
			alert("Não foi possível deletar o item.");
		} finally {
			setLoading(false);
		}
	};

  if (authLoading || loading) {
    return <div className="loading-container"><h2>A carregar...</h2></div>;
  }

  if (!perfil) {
     return (
        <div className="loading-container">
            <p>Não foi possível carregar o perfil.</p>
            <Button onClick={() => navigate('/login')}>Ir para o Login</Button>
        </div>
     );
  }

  return (
    <>
      <div className="perfil-fundo">
        <div className="perfil-container">
          <aside className="perfil-sidebar">
            <div className="perfil-card-sidebar">
              <img className="perfil-foto" src={perfil.foto || 'https://placehold.co/150'} alt="Foto do usuário" />
              <h2>{perfil.nome}</h2>
              <p>{perfil.usuario.email}</p>
              
              <div className="perfil-actions">
                <Button className="btn-editar" onClick={() => setEditando(true)}>Editar Perfil</Button>
                <Button className="btn-danger" onClick={() => { logout(); navigate('/login'); }}>Sair</Button>
              </div>
              
              <Link to="/cadastrar-itens" className="d-block w-100 mt-3">
                <Button className="btn-success w-100">Cadastrar Novo Item</Button>
              </Link>
            </div>
          </aside>

          <main className="perfil-conteudo">
            {editando ? (
              <div className="perfil-card">
                <h3>Editar Perfil</h3>
                <form onSubmit={handleSalvar} className="perfil-form-edicao">
                  <div className="form-group">
                    <label>Nome</label>
                    <input type="text" name="nome" value={form.nome || ''} onChange={handleChange} className="form-control" required />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={perfil.usuario.email} readOnly className="form-control-readonly" />
                  </div>
                  <div className="perfil-actions-form">
                    <Button type="button" className="btn-secondary" onClick={() => setEditando(false)}>Cancelar</Button>
                    <Button type="submit" disabled={saving}>{saving ? 'A salvar...' : 'Salvar'}</Button>
                  </div>
                </form>
              </div>
            ) : (
              <>
                <div className="perfil-card">
                  <h3>Meus Endereços</h3>
                  {perfil.enderecos && perfil.enderecos.length > 0 ? (
                    <ul className="info-list">
                      {perfil.enderecos.map(({ endereco }) => ( <li key={endereco.id}>{endereco.logradouro}, {endereco.numeroResidencia} - {endereco.cidade}/{endereco.uf}</li> ))}
                    </ul>
                  ) : ( <p className="info-vazia">Nenhum endereço cadastrado.</p> )}
                  <button onClick={() => setIsEnderecoModalOpen(true)} className="btn-add mt-2">+ Adicionar Endereço</button>
                </div>

                <div className="perfil-card">
                  <h3>Meus Telefones</h3>
                  {perfil.telefones && perfil.telefones.length > 0 ? (
                    <ul className="info-list">
                      {perfil.telefones.map((telefone) => ( <li key={telefone.id}>{telefone.numero} ({telefone.tipo})</li> ))}
                    </ul>
                  ) : ( <p className="info-vazia">Nenhum telefone cadastrado.</p> )}
                  <button onClick={() => setIsTelefoneModalOpen(true)} className="btn-add mt-2">+ Adicionar Telefone</button>
                </div>

                <div className="perfil-card">
                  <h3>Meus Itens</h3>
                  {perfil.produtos && perfil.produtos.length > 0 ? (
                    <ul className="item-list">
                      {perfil.produtos.map((item) => (
                        <li key={item.id} className="item-card">
                          <strong>{item.nomeProduto}</strong>
                          <p>{item.categoria?.nomeCategoria || 'Sem categoria'}</p>
                          <div className="d-flex gap-2 mt-2">
                            <Link to={`/editar-item/${item.id}`}><Button className="btn-warning btn-sm">Editar</Button></Link>
                            <Button
                              className="btn-danger btn-sm"
                              onClick={() => handleDeleteItem(item.id)}
                            >
                              Deletar
                            </Button>
                          </div>
                        
                        </li>
                      ))}
                    </ul>
                  ) : ( <p className="info-vazia">Você ainda não cadastrou nenhum item.</p> )}
                </div>
              </>
            )}
          </main>
        </div>
      </div>

      <EnderecoModal isOpen={isEnderecoModalOpen} onClose={() => setIsEnderecoModalOpen(false)} pessoaId={usuario.id} onSuccess={carregarPerfil} />
      <TelefoneModal isOpen={isTelefoneModalOpen} onClose={() => setIsTelefoneModalOpen(false)} pessoaId={usuario.id} onSuccess={carregarPerfil} />
    </>
  );
};

export default Perfil;