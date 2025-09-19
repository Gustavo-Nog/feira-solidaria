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
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const isActive = (path) => location.pathname === path ? 'active' : '';

  const navLinks = [
    { to: "/dashboard", icon: <MdDashboard />, label: "Dashboard" },
    { to: "/usuarios", icon: <FaUser />, label: "Usuários" },
    { to: "/listar-produtos", icon: <FaBagShopping />, label: "Produtos" },
    { to: "/categorias", icon: <FaBagShopping />, label: "Categorias" },
    { to: "/acoes-adm", icon: <ImAccessibility />, label: "Ações Admin" },
    { to: "/configuracoes", icon: <FaGear />, label: "Configurações" },
  ];

  return (
    <>
      {variant === 'mobile' && (
        <button className="menu-toggle-admin d-md-none" onClick={toggleMenu} aria-label="Abrir menu">
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      )}

      {variant === 'desktop' && (
        <div className="navbar-admin-desktop d-none d-md-flex flex-column p-3">
          <div className="navbar-brand fs-3 fw-bold mb-3 text-center text-uppercase">
            <Link to="/cadastro">Feira Solidária</Link>
          </div>
          <div className="nav flex-column nav-pills">
            {navLinks.map(({ to, icon, label }) => (
              <Link key={to} to={to} className={`nav-link ${isActive(to)}`}>
                {icon} {label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {variant === 'mobile' && (
        <div className={isMenuOpen ? "nav-mobile-admin open" : "nav-mobile-admin"} role="dialog" aria-modal="true">
          <div className="navbar-brand fs-4 fw-bold mb-4">
            <Link to="/admin" onClick={closeMenu}>Feira Solidária</Link>
          </div>
          {navLinks.map(({ to, icon, label }) => (
            <Link key={to} to={to} onClick={closeMenu} className={`nav-link ${isActive(to)}`}>
              {icon} {label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default NavbarAdmin;