import { useState, useEffect } from "react"; 
import { FormProvider, useForm } from "react-hook-form";

import ModalAdmin from "../../../components/Admin/ModalAdmin/ModalAdmin";
import InputField from "../../../components/Input/InputField";
import Tabela from "../../../components/Admin/Tabela/Tabela";
import Button from '../../../components/Button/Button';

import categoriaServices from "../../../services/categoriaServices";

import "./Categoria.css";
 
function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

  const [busca, setBusca] = useState("");

  const [isCadastroOpen, setIsCadastroOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const methods = useForm({
    defaultValues: {
      nomeCategoria: "",
      descricao: "",
    },
  });

  useEffect(() => {
    const fetchCategorias = async () => {
      setLoading(true);
      try {
        const data = await categoriaServices.listarCategorias();
        setCategorias(data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategorias();
  }, []);

  useEffect(() => {
    if (isEditOpen && categoriaSelecionada) {
      methods.reset({
        nomeCategoria: categoriaSelecionada.nomeCategoria,
        descricao: categoriaSelecionada.descricao || "",
      });
    }
  }, [isEditOpen, categoriaSelecionada, methods]);

  const handleCadastro = async (data) => {
    setLoading(true);
    try {
      const response = await categoriaServices.criarCategoria(data);
      setCategorias([...categorias, response]);
      setIsCadastroOpen(false);
    } catch (error) {
      console.error("Erro ao cadastrar categoria:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (data) => {
    if (!categoriaSelecionada) return;
    setLoading(true);
    try {
      const response = await categoriaServices.atualizarCategoria(
        categoriaSelecionada.id,
        data
      );
      setCategorias((prev) =>
        prev.map((categoria) =>
          categoria.id === response.id ? response : categoria
        )
      );
      setIsEditOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!categoriaSelecionada) return;
    setLoading(true);
    try {
      await categoriaServices.deletarCategoria(categoriaSelecionada.id);
      setCategorias((prev) =>
        prev.filter((categoria) => categoria.id !== categoriaSelecionada.id)
      );
      setIsDeleteOpen(false);
    } catch (error) {
      alert("Erro ao deletar categoria. Verifique se há produtos vinculados.");
    } finally {
      setLoading(false);
    }
  };

  const categoriasFiltradas = categorias.filter(categoria =>
    categoria.nomeCategoria.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="categorias-container">
      <div className="categorias-header d-flex align-items-center mb-4 gap-2">
        <input
          className="form-control"
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar categoria"
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
          Cadastrar Categoria
        </Button>
      </div>

      {loading && <p>Carregando...</p>}

      <h3 className="fs-4 text-dark">Lista de Categorias</h3>
      <Tabela>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categoriasFiltradas.map((categoria) => (
            <tr key={categoria.id}>
              <td>{categoria.nomeCategoria}</td>
              <td>{categoria.descricao || "Sem descrição"}</td>
              <td>
                <Button
                  size="small"
                  className=" me-2 py-2 rounded fs-0.9"
                  style={{
                      backgroundColor: "#2196f3"
                  }}
                  onClick={() => {
                    setCategoriaSelecionada(categoria);
                    setIsEditOpen(true);
                  }}
                >
                  Editar
                </Button>
                <Button
                  size="small"
                  className="btn-danger me-2 py-2 rounded fs-0.9"
                  style={{
                      backgroundColor: "#f44336"
                  }}
                  onClick={() => {
                    setCategoriaSelecionada(categoria);
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
          title="Cadastrar Categoria"
          onConfirm={methods.handleSubmit(handleCadastro)}
          confirmText="Cadastrar"
          confirmClass="btn-success"
        >
          <InputField name="nomeCategoria" label="Nome da Categoria" required />
          <InputField name="descricao" label="Descrição" />
        </ModalAdmin>

        <ModalAdmin
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          title="Editar Categoria"
          onConfirm={methods.handleSubmit(handleEdit)}
          confirmText="Salvar"
          confirmClass="btn-primary"
        >
          <InputField name="nomeCategoria" label="Nome da Categoria" required />
          <InputField name="descricao" label="Descrição" />
        </ModalAdmin>

        <ModalAdmin
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          title="Deletar Categoria"
          onConfirm={handleDelete}
          confirmText="Deletar"
          confirmClass="btn-danger"
        >
          <p>Tem certeza que deseja deletar esta categoria?</p>
        </ModalAdmin>
      </FormProvider>
    </div>
  );
}

export default Categorias;
