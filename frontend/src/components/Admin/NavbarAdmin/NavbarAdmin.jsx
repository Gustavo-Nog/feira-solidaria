import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUser, FaGear, FaBagShopping, FaBars, FaTimes } from 'react-icons/fa6';
import { MdDashboard } from "react-icons/md";
import { ImAccessibility } from "react-icons/im";
<<<<<<< HEAD
import { AiFillCalendar } from "react-icons/ai";

=======
>>>>>>> developer
import './NavbarAdmin.css';

function NavbarAdmin({ variant = 'desktop' }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
<<<<<<< HEAD
			<div className="row">
				<div className="navbar-brand fs-3 fw-bold mb-3">
					<Link to="/admin">Feira Solidária</Link>
					
				</div>
				<div className="nav flex-column nav-pills">
					<Link to="/dashboard" className={`nav-link ${isActive('/dashboard')} `}>
						<MdDashboard /> Dashboard
					</Link>
 
					<Link to="/usuarios" className={`nav-link ${isActive('/usuarios')}`}>
						<FaUser /> Usuarios
					</Link>
					
					<Link to="/listar-produtos" className={`nav-link ${isActive('/listar-produtos')}`}>
						<FaBagShopping /> Produtos
					</Link>
					
					<Link to="/categorias" className={`nav-link ${isActive('/categorias')}`}>
						<AiFillCalendar /> Categorias
					</Link>
					
					<Link to="/acoes-adm" className={`nav-link ${isActive('/acoes-adm')}`}>
						<ImAccessibility /> Ações Admin
					</Link>
=======
      {variant === 'mobile' && (
        <button className="menu-toggle-admin d-md-none" onClick={toggleMenu} aria-label="Abrir menu">
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      )}
>>>>>>> developer

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

      <div className="navbar-admin-desktop d-none d-md-flex flex-column p-3">
        <div className="navbar-brand fs-3 fw-bold mb-3">
          <Link to="/admin">Feira Solidária</Link>
        </div>

        <div className="nav flex-column nav-pills">
          <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>
            <MdDashboard /> Dashboard
          </Link>

          <Link to="/usuarios" className={`nav-link ${isActive('/usuarios')}`}>
            <FaUser /> Usuários
          </Link>

          <Link to="/listar-produtos" className={`nav-link ${isActive('/listar-produtos')}`}>
            <FaBagShopping /> Produtos
          </Link>

          <Link to="/categorias" className={`nav-link ${isActive('/categorias')}`}>
            <FaBagShopping /> Categorias
          </Link>

          <Link to="/acoes-adm" className={`nav-link ${isActive('/acoes-admin')}`}>
            <ImAccessibility /> Ações Admin
          </Link>

          <Link to="/configuracoes" className={`nav-link ${isActive('/configuracoes')}`}>

            <FaGear /> Configurações
          </Link>
        </div>
      </div>

      <button className="menu-toggle-admin d-md-none" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      <div className={isMenuOpen ? "nav-mobile-admin open" : "nav-mobile-admin"}>
        <div className="navbar-brand fs-4 fw-bold mb-4">
          <Link to="/admin" onClick={closeMenu}>Feira Solidária</Link>
        </div>

        <Link to="/dashboard" onClick={closeMenu} className={`nav-link ${isActive('/dashboard')}`}>
          <MdDashboard /> Dashboard
        </Link>

        <Link to="/usuarios" onClick={closeMenu} className={`nav-link ${isActive('/usuarios')}`}>
          <FaUser /> Usuários
        </Link>

        <Link to="/listar-produtos" onClick={closeMenu} className={`nav-link ${isActive('/listar-produtos')}`}>
          <FaBagShopping /> Produtos
        </Link>

        <Link to="/categorias" onClick={closeMenu} className={`nav-link ${isActive('/categorias')}`}>
          <FaBagShopping /> Categorias
        </Link>

        <Link to="/acoes-adm" onClick={closeMenu} className={`nav-link ${isActive('/acoes-admin')}`}>
          <ImAccessibility /> Ações Admin
        </Link>

        <Link to="/configuracoes" onClick={closeMenu} className={`nav-link ${isActive('/configuracoes')}`}>
          <FaGear /> Configurações
        </Link>
      </div>
    </>
  );
}

export default NavbarAdmin;
