import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUser, FaGear, FaBagShopping } from 'react-icons/fa6';
import { MdDashboard } from "react-icons/md";

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
					<Link to="/dashboard" className={`nav-link ${isActive('/dashboard')} `}>
						<MdDashboard /> Dashboard
					</Link>
 
					<Link to="/usuarios" className={`nav-link ${isActive('/usuarios')}`}>
						<FaUser /> Usuarios
					</Link>
					
					<Link to="/listar-produtos" className={`nav-link ${isActive('/listar-produtos')}`}>
						<FaBagShopping /> Produtos
					</Link>
					
					<Link to="/configuracoes" className={`nav-link ${isActive('/configuracoes')}`}>
						<FaGear /> Configurações
					</Link>
				</div>
			</div>
    </>
	);
}

export default NavbarAdmin;