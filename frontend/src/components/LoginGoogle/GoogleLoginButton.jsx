import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import './GoogleLoginButton.css';

function GoogleLoginButton() {
  const handleLogin = () => {
    window.location.href = 'http://localhost:3001/api/auth/google';
  };

  return (
    <button className="google-login-button" onClick={handleLogin}>
      <FcGoogle size={22} style={{ marginRight: '8px' }} />
      Entrar com Google
    </button>
  );
}

export default GoogleLoginButton;
