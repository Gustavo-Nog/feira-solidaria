import { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import ModalAdmin from '../../../components/Admin/ModalAdmin/ModalAdmin';
import InputField from '../../../components/Input/InputField';

import usuarioServices from '../../../services/usuarioService';

import './Usuarios.css';

function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

    const [isCadastroOpen, setIsCadastroOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    
    const methods = useForm({
        defaultValues: {
            nomeUsuario: usuarioSelecionado?.nomeUsuario || "",
            email: usuarioSelecionado?.email || "",
            senha: ""
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
        if (isEditOpen && usuarioSelecionado) {
            methods.reset({
                nomeUsuario: usuarioSelecionado.nomeUsuario, 
                email: usuarioSelecionado.email,
                senha: ""
            });
        }
    }, [isEditOpen, usuarioSelecionado]);


    const handleCadastro = async (data) => {
        try {
            const response = await usuarioServices.criarUsuario(data);
            setUsuarios([...usuarios, response]);
            console.log("Cadastro feito:", data);
            setIsCadastroOpen(false);
        } catch (error) {
                console.error("Erro ao cadastrar usuário:", error);
        }
    };

    const handleEdit = async (data) => {
        try {
            const response = await usuarioServices.atualizarUsuario(usuarioSelecionado.id, data);
            setUsuarios(usuarios.map(usuario => usuario.id === response.id ? response : usuario));
            console.log("Atualizando usuário:", data);
            setIsEditOpen(false);
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await usuarioServices.deletarUsuario(usuarioSelecionado.id);
            setUsuarios(usuarios.filter(usuario => usuario.id !== usuarioSelecionado.id));
            console.log("Usuário deletado!");
            setIsDeleteOpen(false);
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
        }
    };

    return(
        <>
            <div className="usuarios-container">
                <div className="usuarios-header">
                    <h2>Lista de Usuários</h2>
                    <button onClick={() => setIsCadastroOpen(true)}>Cadastrar Usuário</button>
                </div>
                
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map(usuario => (
                                <tr key={usuario.id}>
                                    <td>{usuario.nomeUsuario}</td>
                                    <td>{usuario.email}</td>
                                    <td>
                                        <button className="btn-edit" onClick={() => { setUsuarioSelecionado(usuario); setIsEditOpen(true); }}>
                                            Editar
                                        </button>
                                        <button className="btn-delete" onClick={() => { setUsuarioSelecionado(usuario); setIsDeleteOpen(true); }}>
                                            Deletar
                                        </button>
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
                    </ModalAdmin>

                    <ModalAdmin
                        isOpen={isEditOpen}
                        onClose={() => setIsEditOpen(false)}
                        title="Editar Usuário"
                        onConfirm={methods.handleSubmit(handleEdit)}
                        confirmText="Salvar"
                        confirmClass="btn-primary"
                    >
                        <InputField name="nomeUsuario" label="Nome" required />
                        <InputField name="email" label="Email" type="email" required />
                        <InputField name="senha" label="Senha" type="password" required />
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