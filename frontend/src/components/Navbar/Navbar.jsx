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

        {/* NAVEGAÇÃO PARA DESKTOP COM TODOS OS LINKS */}
        <nav className="nav-desktop">
          <Link to="/" className="nav-link-item">Início</Link>
          <Link to="/cardapio" className="nav-link-item">Cardápio</Link>
          <Link to="/contato" className="nav-link-item">Contato</Link>
          <Link to="/sobre-nos" className="nav-link-item">Sobre nós</Link>
          {/* LINKS QUE FALTAVAM, ADICIONADOS AQUI */}
          <Link to="/carrinho" className="nav-link-item">Carrinho</Link>
          <Link to="/seu-perfil" className="nav-link-item">Seu Perfil</Link>
        </nav>

        {/* ÁREA DE PERFIL PARA DESKTOP */}
        <div className="profile-area-desktop">
          <div className="profile-icon">
            <FaUserCircle className="default-user-icon" />
          </div>
          <div className="profile-actions">
            {usuarioLogado ? (
              // Se o usuário está logado, o link "Seu Perfil" já está na nav, 
              // então podemos colocar só o nome ou remover essa seção.
              // Por enquanto, deixarei os links de cadastro/login.
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

        {/* BOTÃO HAMBÚRGUER PARA MOBILE */}
        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* MENU QUE ABRE NO MOBILE, AGORA COM TODOS OS LINKS */}
        <div className={isMenuOpen ? "nav-mobile open" : "nav-mobile"}>
          <Link to="/" onClick={closeMenu}>Início</Link>
          <Link to="/cardapio" onClick={closeMenu}>Cardápio</Link>
          <Link to="/contato" onClick={closeMenu}>Contato</Link>
          <Link to="/sobre-nos" onClick={closeMenu}>Sobre nós</Link>
          {/* LINKS QUE FALTAVAM, ADICIONADOS AQUI */}
          <Link to="/carrinho" onClick={closeMenu}>Carrinho</Link>
          <Link to="/seu-perfil" onClick={closeMenu}>Seu Perfil</Link>
          
          <div className="separator"></div>

          {/* Links de perfil no menu mobile */}
          {usuarioLogado ? (
            // O link "Seu Perfil" já está acima, então aqui não precisamos de nada extra
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