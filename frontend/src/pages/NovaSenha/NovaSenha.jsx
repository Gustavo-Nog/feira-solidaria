import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../../components/Button/Button';
import InputField from '../../components/Input/InputField';

import './NovaSenha.css';

function RedefinirSenhaNova() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const tokenUrl = queryParams.get('token');

  const tokenSaved = localStorage.getItem('resetToken');

  const methods = useForm();
  const { handleSubmit, formState: { errors } } = methods;

  if (!tokenUrl || tokenUrl !== tokenSaved) {
    return (
      <div className="reset-container">
        <div className="reset-form-container">
          <h2>Token inválido ou expirado.</h2>
          <p>Solicite novamente a redefinição de senha.</p>
        </div>
      </div>
    );
  }

  const onSubmit = (data) => {
    if (data.senha !== data.confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      localStorage.removeItem('resetToken');
      localStorage.removeItem('resetEmail');

      alert("Senha redefinida com sucesso!");
      setLoading(false);
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="reset-container">
      <div className="reset-form-container">
        <h2>Defina sua nova senha</h2>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="reset-form">
            <InputField
              name="senha"
              label="Senha"
              type="password"
              required={{ value: true, message: "Senha é obrigatória" }}
            />

            <InputField
              name="confirmarSenha"
              label="Confirmação de Senha"
              type="password"
              required={{ value: true, message: "Confirmação é obrigatória" }}
            />

            <Button type="submit" loading={loading}>
              Concluir
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default RedefinirSenhaNova;



