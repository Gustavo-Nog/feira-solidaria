import React from 'react';
import './AdminModal.css';

function AdminModal({ isOpen, onClose, dados }) {
  if (!isOpen) return false;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Painel Administrativo</h2>
        <div className="admin-metrics">
          <div className="metric-card">
            <h4>Itens Cadastrados</h4>
            <p>{dados.totalItens}</p>
          </div>
          <div className="metric-card">
            <h4>Usuários Ativos</h4>
            <p>{dados.usuariosAtivos}</p>
          </div>
          <div className="metric-card">
            <h4>Doações Realizadas</h4>
            <p>{dados.totalDoacoes}</p>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn btn-primary" onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
}

export default AdminModal;
