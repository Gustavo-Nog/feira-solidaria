import React, { useState } from "react";
import { useForm } from "react-hook-form";
import pessoaServices from "../../services/pessoaServices";

import './PessoaModal.css';

function PessoaModal({ isOpen, onClose, usuarioId }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) {
    return null;
  }

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const dadosPessoa = {
        ...data,
        usuarioId,
        dataNascimento: data.dataNascimento
          ? new Date(data.dataNascimento).toISOString()
          : null,
      };

      await pessoaServices.criarPessoa(dadosPessoa);
      alert('Perfil criado com sucesso! Agora pode fazer o login.');
      onClose();
    } catch (error) {
      console.error('Erro ao salvar informações da pessoa:', error);
      const errorMessage =
        error.response?.data?.error || 'Não foi possível salvar as informações. Tente novamente.';
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Complete o seu Perfil</h2>
        <p className="modal-subtitle">Estas informações são necessárias para continuar.</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="nome">Nome Completo</label>
            <input
              id="nome"
              type="text"
              placeholder="Ex: Ana da Silva"
              {...register('nome', {
                required: 'O nome é obrigatório',
                minLength: { value: 3, message: 'O nome deve ter pelo menos 3 caracteres' }
              })}
              className="form-control"
            />
            {errors.nome && <p className="error-message">{errors.nome.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="cpf">CPF</label>
            <input
              id="cpf"
              type="text"
              placeholder="Ex: 123.456.789-00"
              {...register('cpf', {
                required: 'O CPF é obrigatório',
                pattern: {
                  value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                  message: 'Formato de CPF inválido. Use 000.000.000-00'
                }
              })}
              className="form-control"
            />
            {errors.cpf && <p className="error-message">{errors.cpf.message}</p>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dataNascimento">Data de Nascimento</label>
              <input
                id="dataNascimento"
                type="date"
                {...register('dataNascimento', { required: 'A data de nascimento é obrigatória' })}
                className="form-control"
              />
              {errors.dataNascimento && <p className="error-message">{errors.dataNascimento.message}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="genero">Gênero</label>
              <select
                id="genero"
                {...register('genero')}
                defaultValue="FEMININO"
                className="form-control"
              >
                <option value="FEMININO">Feminino</option>
                <option value="MASCULINO">Masculino</option>
                <option value="OUTRO">Outro</option>
              </select>
            </div>
          </div>

          <div className="modal-actions">
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary"
            >
              {isLoading ? 'A salvar...' : 'Salvar e Continuar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PessoaModal;