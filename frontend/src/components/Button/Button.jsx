import './Button.css';

function Button({ children, loading, className = 'btn-warning', size = 'md', ...props }) {

  return (
    <button
      className={`btn ${className} w-100 text-light custom-button ${size}`}
      disabled={loading}
      {...props}
    >
      {/*
      ${className}' → permite passar classes como 'btn-warning', 'btn-success' etc. via props
      children representa qualquer conteúdo que você passa entre as tags do componente.
      loading indica se o botão deve mostrar um texto de carregamento.
      */}

      {loading ? 'Carregando...' : children}
    </button >
  );
}

export default Button;