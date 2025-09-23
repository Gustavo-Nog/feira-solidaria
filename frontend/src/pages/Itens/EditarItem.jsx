import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";

import InputField from "../../components/Input/InputField";
import Button from "../../components/Button/Button";

import produtoService from "../../services/produtoServices";
import categoriaService from '../../services/categoriaServices';
import { useUser } from "../../context/UserContext";

import { qualidadeOptions, statusOptions } from "../Admin/ProdutosAdmin/ProdutosAdmin";

// novo: importar o CSS usado no cadastro para padronizar o fundo e estilo
import "../Cadastro-item/Cadastro-item.css";

export default function EditarItem() {
  const { id } = useParams();
  const { usuario } = useUser();
  const [categorias, setCategorias] = useState([]);  
  const navigate = useNavigate();
  const methods = useForm();

  useEffect(() => {
    async function carregarItem() {
      try {
        const item = await produtoService.buscarProduto(id);
        methods.reset(item);
      } catch (error) {
        console.error("Erro ao carregar item:", error);
        alert("Não foi possível carregar os dados do item.");
      }
    }
    carregarItem();
  }, [id, methods]);

  useEffect(() => {
      const fetchCategorias = async () => {
        try {
          const response = await categoriaService.listarCategorias();
          setCategorias(response);
        } catch (error) {
          console.error('Erro ao buscar categorias:', error);
        }
      };
      fetchCategorias();
  }, []);

  const onSubmit = async (data) => {
    try {

        if (!usuario || !usuario.id) {
            alert('Usuário não autenticado ou perfil incompleto. Faça login para cadastrar um produto.');
            return;
        }

        const formData = new FormData();

        const quantidade = Math.max(1, Number(data.quantidade) || 1);

        formData.append('dados', JSON.stringify({
            nomeProduto: data.nomeProduto,
            descricao: data.descricao,
            categoriaId: Number(data.categoriaId),
            pessoaId: usuario.id,
            quantidade,
            qualidade: data.qualidade?.toUpperCase(),
            status: data.status?.toUpperCase()
        }));

        if (data.imagemUrl && data.imagemUrl[0]) {
            formData.append('imagemUrl', data.imagemUrl[0]);
        }

      await produtoService.atualizarProduto(id, formData);
      navigate("/perfil");
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
    }
  };

	const categoriaOptions = categorias.map(categoria => ({
    value: categoria.id,
    label: categoria.nomeCategoria
  }));

  return (
    <FormProvider {...methods}>
      {/* usa o mesmo container do CadastroItem para reaproveitar fundo e padding */}
      <div className="formulario-container container py-4">
        <h2 className="text-center text-uppercase fw-bold mb-4">Editar Produto</h2>

        {/* aplica a mesma classe 'formulario' do CadastroItem */}
        <form onSubmit={methods.handleSubmit(onSubmit)} className="formulario mb-4">
          <div className="row g-3">
            {/* esquerda */}
            <div className="col-md-6">
              <InputField
                name="nomeProduto"
                label="Nome do Produto:"
                required
                className="form-control"
              />

              <InputField
                as="select"
                name="categoriaId"
                label="Categoria:"
                required
                options={categoriaOptions.length ? categoriaOptions : [{ value: "", label: "Carregando..." }]}
                className="form-select mt-2"
              />

              <InputField
                as="select"
                name="qualidade"
                label="Qualidade:"
                options={qualidadeOptions}
                className="form-select mt-2"
              />
            </div>

            {/* direita */}
            <div className="col-md-6">
              <InputField
                name="status"
                label="Status:"
                as="select"
                options={statusOptions}
                className="form-select"
              />

              <InputField
                name="quantidade"
                label="Quantidade:"
                type="number"
                min={1}
                className="form-control mt-2"
              />

              <InputField
                name="imagemUrl"
                label="Imagem do Produto:"
                type="file"
                className="form-control mt-2"
              />
            </div>

            {/* descrição ocupando as duas colunas */}
            <div className="col-12">
              <InputField
                as="textarea"
                name="descricao"
                label="Descrição:"
                required
                rows={4}
                className="form-control"
              />
            </div>
          </div>

          <div className="d-flex justify-content-between gap-2 mt-4">
            <Button
              type="button"
              className="btn-danger"
              onClick={() => navigate('/perfil')}
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              className="btn-success"
            >
              Atualizar
            </Button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}