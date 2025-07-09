import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import feiraLogo from '../../assets/logo-feira.jpg';
import Button from '../../components/Button/Button'; 

import './RedefinirSenha.css';

function RedefinirSenha() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        setLoading(true);
        setTimeout(() => {
            if (data.email === "Feira@gmail.com") {
                alert("Email enviado com sucesso!");
                navigate("/");
            } else {
                alert("Email inválido.");
            }
            setLoading(false);
        }, 1500); 
    };

    return (
        <div className="reset-container">
            <div className="overlay"></div> {/* Aqui é a opacidade */}
            <div className="reset-form-container">
                <img src={feiraLogo} alt="Feira de Trocas" className="logo" />
                <h2>Redefinir Senha</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="reset-form">
                    <input
                        type="email"
                        placeholder="Digite seu email"
                        {...register("email", { required: "Email é obrigatório" })}
                    />
                    {errors.email && <p className="error">{errors.email.message}</p>}
                    <Button type="submit" loading={loading}>
                        Enviar
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default RedefinirSenha;

