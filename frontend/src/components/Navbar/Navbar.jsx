import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { useUser } from '../../context/UserContext';
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { usuario, isAuthenticated, logout } = useUser();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  
  const handleLogout = () => {
    closeMenu(); 
    logout();    
    navigate('/login');
  };

  return (
    <header className="navbar-container sticky-top">
      <div className="navbar-content">

        <div className="navbar-brand">
          <Link to="/" onClick={closeMenu}>Feira Solidária</Link>
        </div>

        <nav className="nav-desktop">
          <Link to="/" className="nav-link-item">Início</Link>
          <Link to="/produtos" className="nav-link-item">Produtos</Link>
          <Link to="/contato" className="nav-link-item">Contato</Link>
          <Link to="/sobre-nos" className="nav-link-item">Sobre nós</Link>
          <Link to="/carrinho" className="nav-link-item">Carrinho</Link>
        </nav>

        <div className="profile-area-desktop">
          <Link to="/perfil">
            <div className="profile-icon">
              {isAuthenticated && usuario?.foto ? (
                <img src={usuario.foto} alt={`Foto de ${usuario.nome}`} className="profile-photo" />
              ) : (
                <FaUserCircle className="default-user-icon" />
              )}
            </div>
          </Link>

          <div className="profile-actions">
            {isAuthenticated ? (
              <>
                <Link to="/perfil">{usuario?.nome || 'Meu Perfil'}</Link>
                <span>/</span>
                <button onClick={handleLogout} className="logout-button">Sair</button>
              </>
            ) : (
              <>
                <Link to="/cadastro">Cadastrar</Link>
                <span>/</span>
                <Link to="/login">Logar</Link>
              </>
            )}
          </div>
        </div>

        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        <div className={isMenuOpen ? "nav-mobile open" : "nav-mobile"}>
          <Link to="/" onClick={closeMenu}>Início</Link>
          <Link to="/produtos" onClick={closeMenu}>Produtos</Link>
          <Link to="/carrinho" onClick={closeMenu}>Carrinho</Link>
          <Link to="/perfil" onClick={closeMenu}>Seu Perfil</Link>
          
          <div className="separator"></div>

          {isAuthenticated ? (
            <button onClick={handleLogout} className="logout-button-mobile">Sair</button>
          ) : (
            <div className="nav-mobile-profile-actions">
              <Link to="/cadastro" onClick={closeMenu}>Cadastrar</Link>
              <Link to="/login" onClick={closeMenu}>Logar</Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}

export default Navbar;