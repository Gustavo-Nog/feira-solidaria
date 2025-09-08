import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import pessoaServices from '../../services/pessoaServices';

// Importe o novo ficheiro CSS para o modal
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
      };
      await pessoaServices.criarPessoa(dadosPessoa);
      alert('Informações salvas com sucesso!');
      onClose();
    } catch (error) {
      console.error('Erro ao salvar informações da pessoa:', error);
      alert('Não foi possível salvar as informações. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Complete o seu Perfil</h2>
        <p className="modal-subtitle">Adicione as suas informações para uma melhor experiência.</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="nome">Nome Completo</label>
            <input
              id="nome"
              type="text"
              {...register('nome', { required: 'O nome é obrigatório' })}
              className="form-control"
            />
            {errors.nome && <p className="error-message">{errors.nome.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="cpf">CPF</label>
            <input
              id="cpf"
              type="text"
              {...register('cpf')}
              className="form-control"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dataNascimento">Data de Nascimento</label>
              <input
                id="dataNascimento"
                type="date"
                {...register('dataNascimento')}
                className="form-control"
              />
            </div>
            <div className="form-group">
               <label htmlFor="genero">Gênero</label>
                <select
                  id="genero"
                  {...register('genero')}
                  defaultValue="OUTRO"
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
              {isLoading ? 'A salvar...' : 'Salvar Informações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PessoaModal;