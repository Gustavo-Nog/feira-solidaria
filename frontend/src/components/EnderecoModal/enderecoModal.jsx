import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import pessoaServices from "../../services/pessoaServices";
import Button from '../Button/Button';
import './EnderecoModal.css';

function EnderecoModal({ isOpen, onClose, pessoaId, onSuccess }) {
  const { register, handleSubmit, formState: { errors }, setValue, setFocus } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleCepLookup = async (cep) => {
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) return;
    try {
      const { data } = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      if (data.erro) {
        alert('CEP não encontrado.');
        return;
      }
      setValue('logradouro', data.logradouro);
      setValue('bairro', data.bairro);
      setValue('cidade', data.cidade);
      setValue('uf', data.uf);
      setFocus('numeroResidencia');
    } catch (error) {
      console.error("Erro ao buscar CEP", error);
      alert("Não foi possível buscar o CEP.");
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await pessoaServices.adicionarEnderecoPessoa(pessoaId, data);
      alert('Endereço adicionado com sucesso!');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Erro ao adicionar endereço:', error);
      alert(error.message || 'Não foi possível adicionar o endereço.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-button" aria-label="Fechar">&times;</button>
        <h2>Adicionar Novo Endereço</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="cep">CEP</label>
            <input id="cep" type="text" {...register('cep', { required: 'O CEP é obrigatório' })} onBlur={(e) => handleCepLookup(e.target.value)} className="form-control" />
            {errors.cep && <p className="error-message">{errors.cep.message}</p>}
          </div>
          <div className="form-row">
            <div className="form-group" style={{ flex: 3 }}><label>Logradouro</label><input {...register('logradouro', { required: true })} className="form-control" /></div>
            <div className="form-group" style={{ flex: 1 }}><label>Número</label><input {...register('numeroResidencia', { required: true })} className="form-control" /></div>
          </div>
          <div className="form-group"><label>Bairro</label><input {...register('bairro', { required: true })} className="form-control" /></div>
          <div className="form-row">
            <div className="form-group" style={{ flex: 2 }}><label>Cidade</label><input {...register('cidade', { required: true })} className="form-control" /></div>
            <div className="form-group" style={{ flex: 1 }}><label>UF</label><input {...register('uf', { required: true })} className="form-control" /></div>
          </div>
          <div className="modal-actions">
            <Button type="submit" disabled={isLoading}>{isLoading ? 'A salvar...' : 'Salvar Endereço'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EnderecoModal;