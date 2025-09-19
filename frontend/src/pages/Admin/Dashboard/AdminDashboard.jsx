import { useState, useEffect } from 'react';
import { FaUsers, FaBasketShopping, FaHandshake } from 'react-icons/fa6';
import { MdCategory } from "react-icons/md";
import { Link } from 'react-router-dom';

import usuarioServices from '../../../services/usuarioServices';
import produtoServices from '../../../services/produtoServices';
import categoriaServices from '../../../services/categoriaServices';
import acoesAdmServices from '../../../services/acoesAdmServices'

function Dashboard() {

	const [totalDeUsuarios, setTotalUsuarios] = useState(0);
	const [totalDeProdutos, setTotalProdutos] = useState(0);
	const [totalDeCategorias, setTotalCategorias] = useState(0);
	const [totalDeAcoesAdm, setTotalAcoesAdm] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const usuariosData = await usuarioServices.totalUsuarios();
				const produtosData = await produtoServices.totalProdutos();
				const categoriasData = await categoriaServices.totalCategorias();
				const acoesAdmData = await acoesAdmServices.totalAcoesAdm();

				setTotalUsuarios(usuariosData.totalDeUsuarios);
				setTotalProdutos(produtosData.totalProdutos);
				setTotalCategorias(categoriasData.totalCategorias);
				setTotalAcoesAdm(acoesAdmData.totalAcoesAdm);
			} catch (error) {
				console.error("Erro ao buscar dados:", error);
			}
 	 	};

			fetchData();
		}, []);


	return (
		<>
			<div className="container-fluid h-100 m-0 p-0" >
				<div className="row h-50">
						
						<div className="col-12 col-md-6 h5 border border-white d-flex align-items-center justify-content-center"
								style={{ backgroundColor: "#5ba263ff" }}>
								<Link
										to="/usuarios"
										className="text-decoration-none w-100 h-100 d-flex flex-column text-white"
								>
										<h2 className="text-center mt-2 fw-bold text-uppercase">Total de usuários</h2>
										<div className="d-flex flex-grow-1 align-items-center">
												<div className="flex-shrink-0 ms-3">
														<FaUsers size={100} color="white" />
												</div>
												<div className="flex-grow-1 d-flex justify-content-center">
														<span className="display-4">{totalDeUsuarios}</span>
												</div>
										</div>
								</Link>
						</div>

						<div className="col-12 col-md-6 h5 border border-white d-flex align-items-center justify-content-center"
										style={{ backgroundColor: "#5ba263ff" }}>
								<Link
										to="/listar-produtos"
										className="text-decoration-none w-100 h-100 d-flex flex-column text-white"
								>
										<h2 className="text-center mt-2 fw-bold text-uppercase">Total de produtos</h2>
										<div className="d-flex flex-grow-1 align-items-center">
												<div className="flex-shrink-0 ms-3">
														<FaBasketShopping size={100} color="white" />
												</div>
												<div className="flex-grow-1 d-flex justify-content-center">
														<span className="display-4">{totalDeProdutos}</span>
												</div>
										</div>
								</Link>
						</div>

				</div>

				<div className="row h-50" style={{ backgroundColor: "#5ba263ff" }}> 
						<div className="col-12 col-md-4 border border-white text-center d-flex flex-column justify-content-center align-items-center p-3">
								<Link
										to="/categorias"
										className="text-decoration-none w-100 h-100 d-flex flex-column text-white"
								> 
										<h5 className="text-center mt-2 fw-bold text-uppercase">Categorias</h5>
										<div className="d-flex flex-grow-1 align-items-center">
												<div className="flex-shrink-0 ms-3">
														<MdCategory size={100} color="white" />
												</div>
												<div className="flex-grow-1 d-flex justify-content-center">
														<span className="display-4">{totalDeCategorias}</span>
												</div>
										</div>					
								</Link>

						</div>
						<div className="col-12 col-md-4 border border-white text-center d-flex flex-column justify-content-center align-items-center p-3">
								<Link
										to="/acoes-adm"
										className="text-decoration-none w-100 h-100 d-flex flex-column text-white"
								>
										<h5 className="text-center mt-2 fw-bold text-uppercase">Ações Administrativas</h5>
										<div className="d-flex flex-grow-1 align-items-center">
												<div className="flex-shrink-0 ms-3">
														<FaHandshake size={100} color="white" />
												</div>
												<div className="flex-grow-1 d-flex justify-content-center">
														<span className="display-6">{totalDeAcoesAdm}</span>
												</div>	
										</div>
								</Link>
						</div>
						<div className="col-12 col-md-4 border border-white text-center d-flex flex-column justify-content-center align-items-center p-3">
								<Link 
										to="/"
										className="text-decoration-none w-100 h-100 d-flex flex-column text-white"
								>
										<h5 className="text-center mt-2 fw-bold text-uppercase">Doações</h5>
										<div className="d-flex flex-grow-1 align-items-center">
												<div className="flex-shrink-0 ms-3">
														<FaHandshake size={100} color="white" />
												</div>
												<div className="flex-grow-1 d-flex justify-content-center">
														<span className="display-6">0</span>
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
