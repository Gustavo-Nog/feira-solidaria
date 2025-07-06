import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from "jwt-decode"; // Biblioteca para decodificar o token JWT
import { useNavigate } from "react-router-dom";


function GoogleLoginButton() {

  const navigate = useNavigate();

  return (
    <GoogleLogin
      // Callback chamado quando o login via Google for bem-sucedido
      onSuccess={credentialResponse => {
        console.log(credentialResponse);
        console.log(jwtDecode(credentialResponse.credential));
        navigate("/");
      }}
      onError={() => {
        console.log("Login Falhou!");
        alert("Tente novamente");
      }
      }
    />

  );

}

export default GoogleLoginButton;