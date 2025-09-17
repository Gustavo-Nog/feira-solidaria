import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import ModalAdmin from "../../../components/Admin/ModalAdmin/ModalAdmin";
import InputField from "../../../components/Input/InputField";
import Tabela from "../../../components/Admin/Tabela/Tabela";

import acoesAdmServices from "../../../services/acoesAdmServices";
import usuarioServices from "../../../services/usuarioService";

import './AcoesAdm.css';

function AcoesAdm() {
  const [acoes, setAcoes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [acaoSelecionada, setAcaoSelecionada] = useState(null);

  const [isCadastroOpen, setIsCadastroOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const methods = useForm({
    defaultValues: {
      descricao: acaoSelecionada?.descricao || "",
      usuarioId: acaoSelecionada?.usuarioId || "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [acoesData, usuariosData] = await Promise.all([
          acoesAdmServices.listarAcoesAdm(),
          usuarioServices.listarUsuarios(),
        ]);
        setAcoes(acoesData);
        setUsuarios(usuariosData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isEditOpen && acaoSelecionada) {
      methods.reset({
        descricao: acaoSelecionada.descricao,
        usuarioId: acaoSelecionada.usuarioId,
      });
    }
  }, [isEditOpen, acaoSelecionada, methods]);

  const handleCadastro = async (data) => {
    setLoading(true);
    const payload = {
      ...data,
      usuarioId: Number(data.usuarioId)
    };
    try {
      const response = await acoesAdmServices.criarAcaoAdm(payload);
      setAcoes([...acoes, response]);
      setIsCadastroOpen(false);
    } catch (error) {
      console.error("Erro ao cadastrar ação:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (data) => {
    if (!acaoSelecionada) return;
    setLoading(true);
    const payload = {
      ...data,
      usuarioId: Number(data.usuarioId)
    };
    try {
      const response = await acoesAdmServices.atualizarAcaoAdm(
        acaoSelecionada.id,
        payload
      );
      setAcoes(
        acoes.map((acao) => (acao.id === response.id ? response : acao))
      );
      setIsEditOpen(false);
    } catch (error) {
      console.error("Erro ao editar ação:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async () => {
    if (!acaoSelecionada) return;
    setLoading(true);
    try {
      await acoesAdmServices.deletarAcaoAdm(acaoSelecionada.id);
      setAcoes(acoes.filter((acao) => acao.id !== acaoSelecionada.id));
      setIsDeleteOpen(false);
    } catch (error) {
      console.error("Erro ao deletar ação:", error);
      alert("Erro ao deletar ação. Verifique se há itens vinculados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="acoes-container">
      <div className="acoes-header">
        <h2>Lista de Ações Administrativas</h2>
        <button onClick={() => setIsCadastroOpen(true)}>
          Cadastrar Ação
        </button>
      </div>

      {loading && <p>Carregando...</p>}

      <Tabela>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Data</th>
            <th>Usuário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {acoes.length > 0 ? (
            acoes.map((acao) => (
              <tr key={acao.id}>
                <td>{acao.descricao}</td>
                <td>{acao.data ? new Date(acao.data).toLocaleDateString() : "—"}</td>
                <td>{acao.usuario?.nomeUsuario || "—"}</td>
                <td>
                  <button
                    className="btn-edit"
                    onClick={() => {
                      setAcaoSelecionada(acao);
                      setIsEditOpen(true);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => {
                      setAcaoSelecionada(acao);
                      setIsDeleteOpen(true);
                    }}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>Nenhum registro encontrado.</td>
            </tr>
          )}
        </tbody>
      </Tabela>

      <FormProvider {...methods}>
       <ModalAdmin
    isOpen={isCadastroOpen}
    onClose={() => setIsCadastroOpen(false)}
    title="Cadastrar Ação"
    onConfirm={methods.handleSubmit(handleCadastro)}
    confirmText="Cadastrar"
    confirmClass="btn-success"
>
    <InputField name="descricao" label="Descrição" />

    {/* Adicionando as classes do InputField */}
    <div className="input-wrapper campo mb-3">
        <label className="form-label">Usuário Responsável</label>
        <select {...methods.register("usuarioId")} required className="form-select">
            <option value="">Selecione um usuário</option>
            {usuarios.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                    {usuario.nomeUsuario}
                </option>
            ))}
        </select>
    </div>
        </ModalAdmin>

        <ModalAdmin
    isOpen={isEditOpen}
    onClose={() => setIsEditOpen(false)}
    title="Editar Ação"
    onConfirm={methods.handleSubmit(handleEdit)}
    confirmText="Salvar"
    confirmClass="btn-primary"
>
    <InputField name="descricao" label="Descrição" />

    {/* Adicionando as classes do InputField */}
    <div className="input-wrapper campo mb-3">
        <label className="form-label">Usuário Responsável</label>
        <select {...methods.register("usuarioId")} required className="form-select">
            <option value="">Selecione um usuário</option>
            {usuarios.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                    {usuario.nomeUsuario}
                </option>
            ))}
        </select>
    </div>
        </ModalAdmin>

        <ModalAdmin
          isOpen={isDeleteOpen}
          onClose={() => {
            setIsDeleteOpen(false);
            methods.reset();
          }}
          title="Deletar Ação"
          onConfirm={handleDelete}
          confirmText="Deletar"
          confirmClass="btn-danger"
        >
          <p>Tem certeza que deseja deletar esta ação administrativa?</p>
        </ModalAdmin>
      </FormProvider>
    </div>
  );
}

export default AcoesAdm;