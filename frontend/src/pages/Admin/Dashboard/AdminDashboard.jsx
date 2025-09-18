import { useState } from 'react';
import { FaUsers, FaBasketShopping } from 'react-icons/fa6';
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
			<div className="container h-100">
				<div className="row h-50">
						<div className="col-6 h5 border border-primary d-flex align-items-center justify-content-center">
							<Link to='/usuarios' className="text-decoration-none text-dark w-100 h-100 d-flex align-items-center justify-content-center">
									<FaUsers />&nbsp;Total de usuários
							</Link>
						</div>
						<div className="col-6 h5 border border-primary d-flex align-items-center justify-content-center">
							<Link to='/listar-produtos' className="text-decoration-none text-dark w-100 h-100 d-flex align-items-center justify-content-center">
								<FaBasketShopping />&nbsp;Total de produtos
							</Link>
						</div>
				</div>
				<div className="row h-50">
					<div className="col border border-primary">
						1 de 3
						    
					</div>
					<div className="col border border-primary">
						2 de 3
					</div>
					<div className="col border border-primary">
						3 de 3
					</div>
				</div>
			</div>
			
		</>
	);
}

export default Dashboard;