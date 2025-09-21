import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import feiraLogo from '../../assets/logo-feira.jpg';
import Button from '../../components/Button/Button';
import InputField from '../../components/Input/InputField';

import './RedefinirSenha.css';

function RedefinirSenha() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const methods = useForm();
  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      if (data.email === "Feira@gmail.com") {
        const fakeToken = Math.random().toString(36).substring(2, 15);
        localStorage.setItem('resetToken', fakeToken);
        localStorage.setItem('resetEmail', data.email);

        navigate(`/redefinir-senha-nova?token=${fakeToken}`);
      } else {
        alert("Email inválido.");
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="reset-container">
      <div className="overlay"></div>
      <div className="reset-form-container">
        <img src={feiraLogo} alt="Feira de Trocas" className="logo" />
        <h2>Redefinir Senha</h2>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="reset-form">
            <InputField
              name="email"
              label="Email"
              type="email"
              required={{ value: true, message: "Email é obrigatório" }}
            />
            <Button type="submit" loading={loading}>
              Enviar
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default RedefinirSenha;




