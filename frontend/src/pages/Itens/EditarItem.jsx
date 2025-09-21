import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import produtoService from "../../services/produtoServices";
import InputField from "../../components/Input/InputField";
import Button from "../../components/Button/Button";

export default function EditarItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const methods = useForm();

  useEffect(() => {
    async function carregarItem() {
      try {
        const item = await produtoService.buscarProduto(id);
        methods.reset(item);
      } catch (err) {
        console.error("Erro ao carregar item:", err);
        alert("Não foi possível carregar os dados do item.");
      }
    }
    carregarItem();
  }, [id, methods]);

  const onSubmit = async (data) => {
    try {
      await produtoService.atualizarProduto(id, data);
      navigate("/produtos");
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-xl font-bold mb-4">Editar Item</h1>

        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            name="nome"
            label="Nome do Produto:"
            required
          />

          <InputField
            as="textarea"
            name="descricao"
            label="Descrição:"
            required
          />

          <InputField
            name="imagem"
            label="URL da Imagem:"
            required
          />

          <Button type="submit" className="w-full bg-blue-600 text-white">
            Atualizar
          </Button>
        </form>
      </div>
    </FormProvider>
  );
}