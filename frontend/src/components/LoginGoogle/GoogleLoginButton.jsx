import { FcGoogle } from 'react-icons/fc';
import './GoogleLoginButton.css';

const VITE_API_URL = import.meta.env.VITE_API_URL;

function GoogleLoginButton() {
  
  const handleLogin = () => {
		let apiUrl;
		if (VITE_API_URL.endsWith('/')) {
			apiUrl = VITE_API_URL;
		} else {
			apiUrl = VITE_API_URL + '/';
		}
    window.location.href = `${apiUrl}api/auth/google`;
  };

  return (
    <button className="google-login-button" onClick={handleLogin}>
      <FcGoogle size={22} style={{ marginRight: '8px' }} />
      Entrar com Google
    </button>
  );
}

export default GoogleLoginButton;
