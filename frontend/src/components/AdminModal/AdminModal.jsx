import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import acoesAdmServices from "../../services/acoesAdmServices";

import "./AdminModal.css";
//modal de Admin espelhada em pessoaModal
function AdminModal({ isOpen, onClose, acao }) {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (acao) {
      reset(acao);
    } else {
      reset({ nome: "", descricao: "" });
    }
  }, [acao, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      if (acao) {
        await acoesAdmServices.atualizarAcaoAdm(acao.id, data);
        alert("Ação atualizada com sucesso!");
      } else {
        await acoesAdmServices.criarAcaoAdm(data);
        alert("Ação criada com sucesso!");
      }
      onClose();
    } catch (error) {
      console.error("Erro ao salvar ação:", error);
      alert("Erro ao salvar ação, tente novamente!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{acao ? "Editar Ação" : "Criar Nova Ação"}</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Nome:</label>
            <input {...register("nome", { required: true })} />
          </div>

          <div>
            <label>Descrição:</label>
            <input {...register("descricao", { required: true })} />
          </div>

          <div className="modal-actions">
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar"}
            </button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminModal;
