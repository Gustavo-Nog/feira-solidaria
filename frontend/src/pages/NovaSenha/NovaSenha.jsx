import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../../components/Button/Button'; // Aqui já está importando o botão correto
import './NovaSenha.css';

function RedefinirSenhaNova() {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    // Pega o token da URL (query string)
    const queryParams = new URLSearchParams(location.search);
    const tokenUrl = queryParams.get('token');

    // Pega o token salvo no localStorage
    const tokenSaved = localStorage.getItem('resetToken');

    // Inicializa o react-hook-form
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    // Se o token não existir ou não bater com o token salvo, mostra mensagem de erro
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

    // Função chamada quando o formulário for enviado
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
                <form onSubmit={handleSubmit(onSubmit)} className="reset-form">
                    <input
                        type="password"
                        placeholder="Nova senha"
                        {...register("senha", {
                            required: "Senha é obrigatória",
                            minLength: { value: 6, message: "Mínimo 6 caracteres" }
                        })}
                    />
                    {errors.senha && <p className="error">{errors.senha.message}</p>}

                    <input
                        type="password"
                        placeholder="Confirme a nova senha"
                        {...register("confirmarSenha", { required: "Confirmação é obrigatória" })}
                    />
                    {errors.confirmarSenha && <p className="error">{errors.confirmarSenha.message}</p>}

                    <Button type="submit" loading={loading}>
                        Concluir
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default RedefinirSenhaNova;


