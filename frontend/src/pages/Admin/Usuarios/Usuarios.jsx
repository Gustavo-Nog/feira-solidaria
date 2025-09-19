import { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import ModalAdmin from '../../../components/Admin/ModalAdmin/ModalAdmin';
import InputField from '../../../components/Input/InputField';
import Button from '../../../components/Button/Button';
import Tabela from '../../../components/Admin/Tabela/Tabela';

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
				setUsuarios(data.usuarios);
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
		if (!usuarioSelecionado) return;
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
		if (!usuarioSelecionado) return;
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
			<div className="container-fluid p-4 bg-light min-vh-100">
				<div className="text-center mb-4">
					<h2 className="fs-4 text-dark">Gerenciamento de Usuários</h2>
				</div>

				<div className="d-flex align-items-center mb-4 gap-2">
					<input
						className='mb-1 form-control'
						type="text"
						value={busca}
						onChange={(e) => setBusca(e.target.value)}
						placeholder="Buscar usuário"
					/>
					<Button
						size="sm"
						className="btn-success px-4 py-2 px-3 py-1 rounded-2 fw-bold"
						style={{ 
							backgroundColor: "#4caf50",
							width: "auto"
						}}
						onClick={() => 
							setIsCadastroOpen(true)
						}
					>
						Cadastrar Novo Usuário
					</Button>
				</div>
				
				{loading && <p>Carregando...</p>}
				
				<h3 className="fs-4 text-dark">Lista de Usuários</h3>
				<Tabela>
					<thead>
						<tr>
							<th>Nome</th>
							<th>Email</th>
							<th>Tipo</th>
							<th className="text-center">Ações</th>
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
										size="small"
										className=" me-2 py-2 rounded fs-0.9"
										style = {{
											backgroundColor: "#2196f3"
										}}
										onClick={() => {
											setUsuarioSelecionado(usuario);
											setIsEditOpen(true);
										}}
									>
										Editar
									</Button>

									<Button
										size="small"
										className="btn-danger me-2 py-2 rounded fs-0.9"
										style = {{
											backgroundColor: "#f44336"
										}}
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
				</Tabela>

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
			</div>
		</>
	);
};

export default Usuarios;