function Button({ children, loading, className = 'btn-warning', ...props }) {

  return (
    <button
      className={`btn ${className} w-100 text-light`}
      disabled={loading}
      {...props}
    >
      {/*
      children representa qualquer conteúdo que você passa entre as tags do componente.
      loading indica se o botão deve mostrar um texto de carregamento.
      */}

      {loading ? 'Carregando...' : children}
    </button >
  );
}




export default Button;