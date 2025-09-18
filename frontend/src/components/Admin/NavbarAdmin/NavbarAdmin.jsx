import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUser, FaGear, FaBagShopping, FaBars } from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';
import { MdDashboard } from "react-icons/md";
import { ImAccessibility } from "react-icons/im";
import './NavbarAdmin.css';

function NavbarAdmin({ variant = 'desktop' }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => (location.pathname === path ? 'active' : '');
  const toggleMenu = () => setIsMenuOpen((v) => !v);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {variant === 'mobile' && (
        <button className="menu-toggle-admin d-md-none" onClick={toggleMenu} aria-label="Abrir menu">
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      )}

      <div className={variant === 'desktop' ? "navbar-admin-desktop p-1" : isMenuOpen ? "nav-mobile-admin open" : "nav-mobile-admin"} role={variant === 'mobile' ? "dialog" : undefined} aria-modal={variant === 'mobile' ? "true" : undefined}>
        <div className={variant === 'desktop' ? "navbar-brand fs-3 fw-bold mb-3 text-center text-uppercase" : "navbar-brand fs-4 fw-bold mb-4"}>
          <Link to="/admin" onClick={variant === 'mobile' ? closeMenu : undefined}>Feira Solidária</Link>
        </div>
        <div className={variant === 'desktop' ? "nav flex-column nav-pills" : undefined}>
          <Link to="/dashboard" onClick={variant === 'mobile' ? closeMenu : undefined} className={`nav-link ${isActive('/dashboard')}`}>
            <MdDashboard /> Dashboard
          </Link>
          <Link to="/usuarios" onClick={variant === 'mobile' ? closeMenu : undefined} className={`nav-link ${isActive('/usuarios')}`}>
            <FaUser /> Usuários
          </Link>
          <Link to="/listar-produtos" onClick={variant === 'mobile' ? closeMenu : undefined} className={`nav-link ${isActive('/listar-produtos')}`}>
            <FaBagShopping /> Produtos
          </Link>
          <Link to="/categorias" onClick={variant === 'mobile' ? closeMenu : undefined} className={`nav-link ${isActive('/categorias')}`}>
            <FaBagShopping /> Categorias
          </Link>
          <Link to="/acoes-adm" onClick={variant === 'mobile' ? closeMenu : undefined} className={`nav-link ${isActive('/acoes-adm')}`}>
            <ImAccessibility /> Ações Admin
          </Link>
          <Link to="/configuracoes" onClick={variant === 'mobile' ? closeMenu : undefined} className={`nav-link ${isActive('/configuracoes')}`}>
            <FaGear /> Configurações
          </Link>
        </div>
      </div>
    </>
  );
}

export default NavbarAdmin;
