import { useState, useEffect } from "react"; 
import { FormProvider, useForm } from "react-hook-form";

import ModalAdmin from "../../../components/Admin/ModalAdmin/ModalAdmin";
import InputField from "../../../components/Input/InputField";
import Tabela from "../../../components/Admin/Tabela/Tabela";
import Button from '../../../components/Button/Button';

import acoesAdmServices from "../../../services/acoesAdmServices";
import usuarioServices from "../../../services/usuarioServices";

import './AcoesAdm.css';

function AcoesAdm() {
  const [acoes, setAcoes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [acaoSelecionada, setAcaoSelecionada] = useState(null);

  const [isCadastroOpen, setIsCadastroOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [busca, setBusca] = useState(""); // Campo de pesquisa

  const methods = useForm({
    defaultValues: {
      descricao: acaoSelecionada?.descricao || "",
      usuarioId: acaoSelecionada?.usuarioId || "",
    },
  });

  // Filtrando apenas usuários ADMIN
  const usuariosAdmin = usuarios.filter(u => u.tipo === "ADMIN");

  // Options do select do modal (somente ADMIN)
  const usuariosOptions = usuariosAdmin.map(usuario => ({
    value: usuario.id,
    label: usuario.nomeUsuario
  }));

  // Filtrando apenas ações de usuários ADMIN + filtro de busca
  const acoesFiltradas = acoes.filter(
    acao =>
      acao.usuario?.tipo === "ADMIN" &&
      acao.usuario?.nomeUsuario.toLowerCase().includes(busca.toLowerCase())
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [acoesData, usuariosData] = await Promise.all([
          acoesAdmServices.listarAcoesAdm(),
          usuarioServices.listarUsuarios(),
        ]);

        // Mapear cada ação para incluir o usuário completo com tipo
        const acoesComUsuarios = acoesData.map(acao => {
          const usuario = usuariosData.find(u => u.id === acao.usuarioId);
          return { ...acao, usuario };
        });

        setUsuarios(usuariosData);
        setAcoes(acoesComUsuarios);
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

      // Adicionar usuário completo para exibir na tabela
      const usuario = usuariosAdmin.find(u => u.id === response.usuarioId);
      const acaoComUsuario = { ...response, usuario };

      setAcoes([...acoes, acaoComUsuario]);
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
      await acoesAdmServices.atualizarAcaoAdm(
        acaoSelecionada.id,
        payload
      );

      const listaAtualizada = await acoesAdmServices.listarAcoesAdm();

      // Mapear novamente para incluir tipo de usuário
      const acoesComUsuarios = listaAtualizada.map(acao => {
        const usuario = usuarios.find(u => u.id === acao.usuarioId);
        return { ...acao, usuario };
      });

      setAcoes(acoesComUsuarios);
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
      {/* Campo de pesquisa + botão de cadastrar */}
      <div className="acoes-header d-flex align-items-center mb-4 gap-2">
        <input
          className="form-control"
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar administrador"
        />
        <Button 
            size="sm"
            className="btn-success px-4 py-2 px-3 py-1 rounded-2 fw-bold"
            style={{ 
                backgroundColor: "#4caf50",
                width: "auto"
            }}
            onClick={() => setIsCadastroOpen(true)}
        >
          Cadastrar Ação
        </Button>
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
          {acoesFiltradas.length > 0 ? (
            acoesFiltradas.map((acao) => (
              <tr key={acao.id}>
                <td>{acao.descricao}</td>
                <td>{acao.data ? new Date(acao.data).toLocaleDateString() : "—"}</td>
                <td>{acao.usuario?.nomeUsuario}</td>
                <td>
                  <Button
                    size="small"
                    className="me-2 py-2 rounded fs-0.9"
                    style={{
                        backgroundColor: "#2196f3",
                        color: "white"
                    }}
                    onClick={() => {
                      setAcaoSelecionada(acao);
                      setIsEditOpen(true);
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    size="small"
                    className="btn-danger me-2 py-2 rounded fs-0.9"
                    style={{
                        backgroundColor: "#f44336",
                        color: "white"
                    }}
                    onClick={() => {
                      setAcaoSelecionada(acao);
                      setIsDeleteOpen(true);
                    }}
                  >
                    Deletar
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>Nenhum administrador encontrado.</td>
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
          <div className="input-wrapper campo mb-3">
            <InputField
                name="usuarioId"
                label="Usuário Responsável"
                as="select"
                options={usuariosOptions} // SOMENTE ADMIN
            />
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
          <div className="input-wrapper campo mb-3">
            <InputField
              name="usuarioId"
              label="Usuário Responsável"
              as="select"
              options={usuariosOptions} // SOMENTE ADMIN
            />
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
