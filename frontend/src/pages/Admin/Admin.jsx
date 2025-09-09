import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import Button from '../../components/Button/Button';
import InputField from '../../components/Input/InputField'; 

import './Admin.css';   

function Admin() {
    const methods = useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit = (data) => {
        setLoading(true);
        console.log("Dados do formulário:", data);

        //adiciona aqui a lógica para enviar os dados para o backend (api)

        setLoading(false);
    };

return (
    <div className="admin-container">
      <div className="admin-content">
        <h2>Painel Administrativo</h2>
        <div className="admin-layout">
          {/* Formulário de Administração */}
          <div className="admin-form-section">
            <h3>Gerenciar Itens</h3>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <InputField
                  name="nomeItem"
                  label="Nome do Item"
                  placeholder="Ex: Novo Produto"
                  rules={{ required: "Este campo é obrigatório" }}
                />
                
                <InputField
                  name="valor"
                  label="Valor"
                  type="number"
                  placeholder="Ex: 99.99"
                  rules={{ 
                    required: "O valor é obrigatório",
                    min: { value: 0.01, message: "O valor deve ser positivo" }
                  }}
                />

                <Button type="submit" loading={loading} className="btn-success">
                  Salvar
                </Button>
              </form>
            </FormProvider>
          </div>
          
          {/* Dashboard com Métricas */}
          <div className="admin-dashboard-section">
            <h3>Métricas do Sistema</h3>
            <div className="dashboard-card">
              <h4>Vendas Totais</h4>
              <p className="metric-value">R$ 15.000,00</p>
            </div>
            <div className="dashboard-card">
              <h4>Usuários Ativos</h4>
              <p className="metric-value">120</p>
            </div>
            <div className="dashboard-card">
              <h4>Itens Cadastrados</h4>
              <p className="metric-value">55</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
