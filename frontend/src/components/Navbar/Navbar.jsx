import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import './Navbar.css'; // Estilos personalizados

function Navbar() {
  // Simulação de autenticação
  const usuarioLogado = false;

  // Quando o usuário estiver logado, você terá um objeto com os dados dele.
  // const usuario = { nome: 'Maria', foto: 'url-da-foto.jpg' };

  return (
    <header className="navbar-container sticky-top">
      <div className="nav-links">
        <Link to="/" className="nav-link-item">Início</Link>
        <Link to="/sobre-nos" className="nav-link-item">Sobre Nos</Link>
        <Link to="/cardapio" className="nav-link-item">Cardapio</Link>
        <Link to="/carrinho" className="nav-link-item">Carrinho</Link>
        <Link to="/cadastrar-itens" className="nav-link-item">Cadastrar Itens</Link>
        <Link to="/perfil" className="nav-link-item">Seu Perfil</Link>
      </div>

       <div className="profile-section">
            <div className="profile-icon">
            {/* 2. Lógica para mostrar a foto ou o ícone padrão */}
            {usuarioLogado ? (
                // Se estiver logado, mostre a foto do usuário
                <img src={"url-da-foto-do-usuario.jpg"} alt="Foto do usuário" />
            ) : (
                // Se não, mostre o ícone cinza padrão
                <FaUserCircle className="default-user-icon" />
            )}
            </div>
            <div className="profile-actions">
            {usuarioLogado ? (
                <span>Bem-vindo!</span>
            ) : (
                <>
                <Link to="/cadastro">Cadastrar</Link>
                <Link to="/login">Logar</Link>
                </>
            )}
            </div>
      </div>
    </header>
  );
}

export default Navbar;
