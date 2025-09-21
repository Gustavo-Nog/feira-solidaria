import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import InputField from '../../components/Input/InputField';
import Button from '../../components/Button/Button';

import './Contato.css';
import Solidarize from '../../assets/Solidarize.png';
import suporte from '../../assets/suporte.jpg';


function Contato() {
  const methods = useForm();

  const onSubmit = (data) => {
    console.log('Mensagem enviada:', data);
    alert('Mensagem enviada com sucesso!');
  };

  return (
    <section className="container mt-3 mb-3 contato-section shadow p-4 rounded-4">
      <div className="row align-items-center">
      
        <div className="col-md-6">
          <div className="d-flex align-items-center mb-4">
            <img src={Solidarize} alt="Ícone de Alerta" width={30} height={30} className="me-2" />
            <h2 className="m-0 text-success">Fale Conosco</h2>
          </div>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
              <div className="mb-3">
                <InputField
                  name="nomeCompleto"
                  label="Nome completo"
                  required="Nome completo é obrigatório"
                  className="form-control rounded-3 border-success"
                />
              </div>

              <div className="mb-3">
                <InputField
                  name="email"
                  label="Email"
                  type="email"
                  required="Email é obrigatório"
                  className="form-control rounded-3 border-success"
                />
              </div>

              <div className="mb-3">
                <InputField
                  name="assunto"
                  label="Assunto"
                  required={false}
                  className="form-control rounded-3 border-success"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="mensagem" className="form-label">Mensagem</label>
                <textarea
                  id="mensagem"
                  {...methods.register('mensagem', { required: 'Mensagem é obrigatória' })}
                  className="form-control rounded-3 border-success"
                  rows={5}
                  placeholder="Digite sua mensagem aqui"
                />
                {methods.formState.errors.mensagem && (
                  <div className="text-danger mt-1">
                    {methods.formState.errors.mensagem.message}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                size="wd-10px"
                className="btn"
                style={{ backgroundColor: '#2a6441', border: 'none', color: '#fff' }}
              >
                Enviar
              </Button>
            </form>
          </FormProvider>
        </div>

        <div className="col-md-6 d-none d-md-block text-center">
          <img src={suporte} alt="Imagem de Contato" className="img-fluid rounded-4 shadow" />
        </div>
      </div>
    </section>
  );
}

export default Contato;
