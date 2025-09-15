import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import ModalAdmin from "../../../components/Admin/ModalAdmin/ModalAdmin";
import InputField from "../../../components/Input/InputField";
import Tabela from "../../../components/Admin/Tabela/Tabela";

import categoriaServices from "../../../services/categoriaServices";

import "./Categoria.css";
 
function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

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

  return (
    <div className="categorias-container">
      <div className="categorias-header">
        <h2>Lista de Categorias</h2>
        <button onClick={() => setIsCadastroOpen(true)}>
          Cadastrar Categoria
        </button>
      </div>

      {loading && <p>Carregando...</p>}

      {/* aqui usamos o componente Tabela */}
      <Tabela>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id}>
              <td>{categoria.nomeCategoria}</td>
              <td>{categoria.descricao || "Sem descrição"}</td>
              <td>
                <button
                  className="btn-edit"
                  onClick={() => {
                    setCategoriaSelecionada(categoria);
                    setIsEditOpen(true);
                  }}
                >
                  Editar
                </button>
                <button
                  className="btn-delete"
                  onClick={() => {
                    setCategoriaSelecionada(categoria);
                    setIsDeleteOpen(true);
                  }}
                >
                  Deletar
                </button>
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
