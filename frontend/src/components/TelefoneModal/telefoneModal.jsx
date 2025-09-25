import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import pessoaServices from '../../services/pessoaServices';
import Button from '../Button/Button';
import '../EnderecoModal/enderecoModal.css';

function TelefoneModal({ isOpen, onClose, pessoaId, onSuccess }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await pessoaServices.adicionarTelefonePessoa(pessoaId, data);
      alert('Telefone adicionado com sucesso!');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Erro ao adicionar telefone:', error);
      alert(error.message || 'Não foi possível adicionar o telefone.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-button" aria-label="Fechar">&times;</button>
        <h2>Adicionar Novo Telefone</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <div className="form-group" style={{ flex: 2 }}>
              <label htmlFor="numero">Número</label>
              <input id="numero" type="text" {...register('numero', { required: 'O número é obrigatório' })} className="form-control" />
              {errors.numero && <p className="error-message">{errors.numero.message}</p>}
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="tipo">Tipo</label>
              <select id="tipo" {...register('tipo')} className="form-control">
                <option value="CELULAR">Celular</option>
                <option value="FIXO">Fixo</option>
                <option value="COMERCIAL">Comercial</option>
              </select>
            </div>
          </div>
          <div className="modal-actions">
            <Button type="submit" disabled={isLoading}>{isLoading ? 'A salvar...' : 'Salvar Telefone'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TelefoneModal;