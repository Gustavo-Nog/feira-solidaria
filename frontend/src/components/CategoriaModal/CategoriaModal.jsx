import React from "react";
import { FormProvider } from "react-hook-form";
import Button from "../Button/Button";
import InputField from "../Input/InputField";

import "./CategoriaModal.css";

function CategoriaModal({ isOpen, onClose, methods, onSubmit, loading, editing }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{editing ? "Editar Categoria" : "Nova Categoria"}</h2>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <InputField
              name="nomeCategoria"
              label="Nome da Categoria"
              placeholder="Ex: Eletrônicos"
              rules={{ required: "Este campo é obrigatório" }}
            />

            <InputField
              name="descricao"
              label="Descrição"
              placeholder="Ex: Produtos de tecnologia"
            />

            <div className="modal-actions">
              <Button type="submit" loading={loading} className="btn-success">
                {editing ? "Atualizar" : "Salvar"}
              </Button>
              <Button type="button" onClick={onClose} className="btn-danger">
                Cancelar
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default CategoriaModal;
