import { useState } from 'react';
import { FaUsers, FaBasketShopping, FaHandshake } from 'react-icons/fa6';
import { MdCategory } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';

import ModalAdmin from '../../../components/Admin/ModalAdmin/ModalAdmin';
import InputField from '../../../components/Input/InputField';

import usuarioServices from '../../../services/usuarioServices';

function Dashboard() {

	const totalUsuarios = async () => {
	}

	return (
	<>
		<div className="container h-100 ">
			{/* Linha 1: Cards Usuários e Produtos */}
			<div className="row h-50 g-3">
				
				{/* Card Usuários */}
				<div className="col-12 col-md-6 h5 border border-white d-flex align-items-center justify-content-center"
						style={{ backgroundColor: "#5ba263ff" }}>
					<Link
						to="/usuarios"
						className="text-decoration-none w-100 h-100 d-flex flex-column text-white"
					>
						<h2 className="text-center mt-2 fw-bold">Total de usuários</h2>
						<div className="d-flex flex-grow-1 align-items-center">
							<div className="flex-shrink-0 ms-3">
								<FaUsers size={100} color="white" />
							</div>
							<div className="flex-grow-1 d-flex justify-content-center">
								<span className="display-4">0</span>
							</div>
						</div>
					</Link>
				</div>

				{/* Card Produtos */}
				<div className="col-12 col-md-6 h5 border border-white d-flex align-items-center justify-content-center"
						style={{ backgroundColor: "#5ba263ff" }}>
					<Link
						to="/listar-produtos"
						className="text-decoration-none w-100 h-100 d-flex flex-column text-white"
					>
						<h2 className="text-center mt-2 fw-bold">Total de produtos</h2>
						<div className="d-flex flex-grow-1 align-items-center">
							<div className="flex-shrink-0 ms-3">
								<FaBasketShopping size={100} color="white" />
							</div>
							<div className="flex-grow-1 d-flex justify-content-center">
								<span className="display-4">0</span>
							</div>
						</div>
					</Link>
				</div>

			</div>

			{/* Linha 2: Categorias, Doações e Outro dado */}
			<div className="row h-50 g-3" style={{ backgroundColor: "#5ba263ff" }}> 
				<div className="col-12 col-md-4 border border-white text-center d-flex flex-column justify-content-center align-items-center p-3">
					<Link
						to="/categorias"
						className="text-decoration-none w-100 h-100 d-flex flex-column text-white"
					> 
						<h5 className="text-center mt-2 fw-bold">Categorias</h5>
						<div className="d-flex flex-grow-1 align-items-center">
							<div className="flex-shrink-0 ms-3">
								<MdCategory size={100} color="white" />
							</div>
							<div className="flex-grow-1 d-flex justify-content-center">
								<span className="display-4">0</span>
							</div>
						</div>					
					</Link>

				</div>
				<div className="col-12 col-md-4 border border-white text-center d-flex flex-column justify-content-center align-items-center p-3">
					<Link
						to="/acoes-adm"
						className="text-decoration-none w-100 h-100 d-flex flex-column text-white"
					>
						<h5 className="text-center mt-2 fw-bold">Acões Administrativas</h5>
						<div className="d-flex flex-grow-1 align-items-center">
							<div className="flex-shrink-0 ms-3">
								<FaHandshake size={100} color="white" />
							</div>
							<div className="flex-grow-1 d-flex justify-content-center">
								<span className="display-6">25</span>
							</div>	
						</div>
					</Link>
				</div>
				<div className="col-12 col-md-4 border border-white text-center d-flex flex-column justify-content-center align-items-center p-3">
					<Link 
						to="/"
						className="text-decoration-none w-100 h-100 d-flex flex-column text-white"
					>
						<h5 className="text-center mt-2 fw-bold">Novos cadastros</h5>
						<div className="d-flex flex-grow-1 align-items-center">
							<div className="flex-shrink-0 ms-3">
								<FaHandshake size={100} color="white" />
							</div>
							<div className="flex-grow-1 d-flex justify-content-center">
								<span className="display-6">5</span>
							</div>	
						</div>
					</Link>
				</div>
			</div>
		</div>
	</>

	);
}

export default Dashboard;