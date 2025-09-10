import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button"; 
import api from "../../services/api"; 

export default function EditarItem() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [item, setItem] = useState({
    nome: "",
    preco: "",
    descricao: "",
    imagem: ""
  });

  useEffect(() => {
    api.get(`/itens/${id}`)
      .then((res) => setItem(res.data))
      .catch((err) => console.error("Erro ao carregar item:", err));
  }, [id]);

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/itens/${id}`, item);
      navigate("/meus-itens"); 
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Alterar Item</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nome"
          value={item.nome}
          onChange={handleChange}
          placeholder="Nome do item"
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="preco"
          value={item.preco}
          onChange={handleChange}
          placeholder="Preço"
          className="w-full border p-2 rounded"
        />

        <textarea
          name="descricao"
          value={item.descricao}
          onChange={handleChange}
          placeholder="Descrição"
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="imagem"
          value={item.imagem}
          onChange={handleChange}
          placeholder="URL da imagem"
          className="w-full border p-2 rounded"
        />

        <Button type="submit" className="w-full bg-blue-600 text-white">
          Atualizar
        </Button>
      </form>
    </div>
  );
}