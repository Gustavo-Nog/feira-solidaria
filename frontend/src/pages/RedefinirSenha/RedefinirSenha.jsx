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
        setLoading(true);
        setTimeout(() => {
            if (data.email === "Feira@gmail.com") {
                // Gera token falso
                const fakeToken = Math.random().toString(36).substring(2, 15);
                // Salva token e email no localStorage
                localStorage.setItem('resetToken', fakeToken);
                localStorage.setItem('resetEmail', data.email);

                // Redireciona automaticamente para a página de redefinir senha nova
                navigate(`/redefinir-senha-nova?token=${fakeToken}`);
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



