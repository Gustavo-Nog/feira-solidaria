import { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import ModalAdmin from '../../../components/Admin/ModalAdmin/ModalAdmin';
import InputField from '../../../components/Input/InputField';
import Button from '../../../components/Button/Button';

import usuarioServices from '../../../services/usuarioServices';

function Usuarios() {
	const [usuarios, setUsuarios] = useState([]);
	const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
	const [busca, setBusca] = useState('');

	const [isCadastroOpen, setIsCadastroOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
	const [isEditOpen, setIsEditOpen] = useState(false);

	const [loading, setLoading] = useState(false);
		
	const methods = useForm({
		defaultValues: {
			nomeUsuario: usuarioSelecionado?.nomeUsuario || "",
			email: usuarioSelecionado?.email || "",
			senha: "",
			tipo: usuarioSelecionado?.tipo || "COMUM"
		}
	});

	useEffect(() => {
		const fetchUsuarios = async () => {
			try {
				const data = await usuarioServices.listarUsuarios();
				setUsuarios(data);
			} catch (error) {
				console.error("Erro ao buscar usuários:", error);
			}
		}
		fetchUsuarios();
	}, []);

	useEffect(() => {
		if(isEditOpen  && usuarioSelecionado) {
			methods.reset({
				nomeUsuario: usuarioSelecionado.nomeUsuario, 
				email: usuarioSelecionado.email,
				senha: "",
				tipo: usuarioSelecionado.tipo
			});
		}
	}, [isEditOpen, usuarioSelecionado]);


  const handleCadastro = async (data) => {
		setLoading(true);
		try {
			const response = await usuarioServices.criarUsuario(data);
			setUsuarios([...usuarios, response]);
			console.log("Cadastro feito:", data);
			setIsCadastroOpen(false);
		} catch (error) {
			console.error("Erro ao cadastrar usuário:", error);
		} finally {
			setLoading(false);
		}
  };

	const handleEdit = async (data) => {
		setLoading(true);
		try {
			const response = await usuarioServices.atualizarUsuario(usuarioSelecionado.id, data);
			setUsuarios(usuarios.map(usuario => usuario.id === response.id ? response : usuario));
			console.log("Atualizando usuário:", data);
			setIsEditOpen(false);
		} catch (error) {
			console.error("Erro ao atualizar usuário:", error);
		} finally {
			setLoading(false);
		}
	};

  const handleDelete = async () => {
		setLoading(true);
		try {
			await usuarioServices.deletarUsuario(usuarioSelecionado.id);
			setUsuarios(usuarios.filter(usuario => usuario.id !== usuarioSelecionado.id));
			console.log("Usuário deletado!");
    	setIsDeleteOpen(false);
		} catch (error) {
			console.error("Erro ao deletar usuário:", error);
		} finally {
			setLoading(false);
		}
	};	

	const usuariosFiltrados = usuarios.filter(usuario =>
  	usuario.nomeUsuario.toLowerCase().includes(busca.toLowerCase())
	);

  return(
		<>
			<div>
				<h1>Gerenciamento de Usuários</h1>
				<div className="mb-3 d-inline">
					<input
						className='mb-1 form-control'
						type="text"
						value={busca}
						onChange={(e) => setBusca(e.target.value)}
						placeholder="Buscar usuário"
					/>
				</div>
				<div className="mb-3">
					<Button
						size="sm"
						className="btn-success mb-2"
						onClick={() => 
							setIsCadastroOpen(true)
						}
					>
						Cadastrar Novo Usuário
					</Button>
				</div>
			</div>
				
			<div>
				<h2>Lista de Usuários</h2>
				<table className="table">
					<thead>
						<tr>
							<th>Nome</th>
							<th>Email</th>
							<th>Tipo</th>
							<th>Ações</th>
						</tr>
					</thead>
					<tbody>
						{usuariosFiltrados.map(usuario => (
							<tr key={usuario.id}>
								<td>{usuario.nomeUsuario}</td>
								<td>{usuario.email}</td>
								<td>{usuario.tipo}</td>
								<td>
									<Button
										size="md"
										className="btn-warning mb-2"
										onClick={() => {
											setUsuarioSelecionado(usuario);
											setIsEditOpen(true);
										}}
									>
										Editar
									</Button>

									<Button
										size="md"
										className="btn-danger mb-2"
										onClick={() => {
											setUsuarioSelecionado(usuario);
												setIsDeleteOpen(true);
										}}
									>
										Deletar
									</Button>

								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<FormProvider {...methods}>
				<ModalAdmin
					isOpen={isCadastroOpen}
					onClose={() => setIsCadastroOpen(false)}
					title="Cadastrar Usuário"
					onConfirm={methods.handleSubmit(handleCadastro)}
					confirmText="Cadastrar"
					confirmClass="btn-success"
				>
					<InputField name="nomeUsuario" label="Nome" required />
					<InputField name="email" label="Email" type="email" required />
					<InputField name="senha" label="Senha" type="password" required />
					<InputField
						name="tipo"
						label="Tipo"
						as="select"
						required
						options={[
							{ value: "ADMIN", label: "Administrador" },
							{ value: "COMUM", label: "Comum" }
						]}
					/>
				</ModalAdmin>

				<ModalAdmin
					isOpen={isEditOpen}
					onClose={() => setIsEditOpen(false)}
					title="Editar Usuário"
					onConfirm={methods.handleSubmit(handleEdit)}
					confirmText="Salvar"
					confirmClass="btn-primary"
				>
					<InputField name="nomeUsuario" label="Nome" />
					<InputField name="email" label="Email" type="email" />
					<InputField name="senha" label="Senha" type="password" />
					<InputField
						name="tipo"
						label="Tipo"
						as="select"
						options={[
							{ value: "ADMIN", label: "Administrador" },
							{ value: "COMUM", label: "Comum" }
						]}
					/>
				</ModalAdmin>

				<ModalAdmin
					isOpen={isDeleteOpen}
					onClose={() => setIsDeleteOpen(false)}
					title="Deletar Usuário"
					onConfirm={handleDelete}
					confirmText="Deletar"
					confirmClass="btn-danger"
				>
					<p>Tem certeza que deseja deletar este usuário?</p>
				</ModalAdmin>
			</FormProvider>
			

		</>
	);
};

export default Usuarios;