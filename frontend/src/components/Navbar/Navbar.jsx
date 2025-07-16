import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const usuarioLogado = false;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

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
          <Link to="/seu-perfil">
            <div className="profile-icon">
              <FaUserCircle className="default-user-icon" />
            </div>
          </Link>

          <div className="profile-actions">
            {usuarioLogado ? (
              <Link to="/seu-perfil">Meu Perfil</Link>
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
          <Link to="/contato" onClick={closeMenu}>Contato</Link>
          <Link to="/sobre-nos" onClick={closeMenu}>Sobre nós</Link>
          <Link to="/carrinho" onClick={closeMenu}>Carrinho</Link>
          <Link to="/seu-perfil" onClick={closeMenu}>Seu Perfil</Link>

          <div className="separator"></div>

          {usuarioLogado ? (
            null
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