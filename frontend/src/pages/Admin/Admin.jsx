import { useState, useEffect } from 'react';
import Button from '../../components/Button/Button';

import './Admin.css';

function Admin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dados, setDados] = useState({
    totalProdutos: 0,
    usuariosAtivos: 0,
    usuariosLogados: 0,
    totalDoacoes: 0,
  });

  const fetchDados = async () => {
    setLoading(true);
    try { // Dados simulados
      setDados({
        totalProdutos: 55,
        usuariosAtivos: 120,
        usuariosLogados: 35,
        totalDoacoes: 30,
      });
    } catch (err) {
      console.error('Erro ao buscar dados:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDados();
  }, []);

  return (
    <div className="admin-container">
      <div className="admin-content">
        <h2>Painel Administrativo</h2>
        <div className="admin-layout">
          
          <div className="admin-actions">
            <Button onClick={() => setIsModalOpen(true)} className="btn-success">
              Abrir Painel Administrativo
            </Button>
          </div>

          <div className="admin-dashboard-section">
            <h3>Métricas do Sistema</h3>
            <div className="dashboard-card">
              <h4>Trocas Realizadas</h4>
              <p className="metric-value">{dados.totalDoacoes}</p>
            </div>
            <div className="dashboard-card">
              <h4>Usuários Ativos</h4>
              <p className="metric-value">{dados.usuariosAtivos}</p>
            </div>
            <div className="dashboard-card">
              <h4>Usuários Logados</h4>
              <p className="metric-value">{dados.usuariosLogados}</p>
            </div>
            <div className="dashboard-card">
              <h4>Produtos Cadastrados</h4>
              <p className="metric-value">{dados.totalProdutos}</p>
            </div>
          </div>
        </div>
      </div>

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        dados={{
          totalItens: dados.totalProdutos,
          usuariosAtivos: dados.usuariosAtivos,
          totalDoacoes: dados.totalDoacoes,
        }}
      />
    </div>
  );
}

export default Admin;
