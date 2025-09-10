import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavbarAdmin.css';

function NavbarAdmin() {

  const location = useLocation(); 

  const isActive = (path) => location.pathname === path ? 'active' : '';	

	return (
    <>
			<div className="row">
				<div className="navbar-brand fs-3 fw-bold mb-3">
					<Link to="/admin">Feira Solidária</Link>
					
				</div>
				<div className="nav flex-column nav-pills">
					<Link to="/admin" className={`nav-link ${isActive('/admin')}`}>
						Dashboard
					</Link>

					<Link to="/usuarios" className={`nav-link ${isActive('/usuarios')}`}>
						Usuarios
					</Link>
					
					<Link to="/listar-produtos" className={`nav-link ${isActive('/listar-produtos')}`}>
						Produtos
					</Link>
					
					<Link to="/configuracoes" className={`nav-link ${isActive('/configuracoes')}`}>
						Configurações
					</Link>
				</div>
			</div>
    </>
	);
}

export default NavbarAdmin;