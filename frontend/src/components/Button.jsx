function Button({ children, loading, className = 'btn-warning', ...props }) {

  return (
    <button
      className={`btn ${className} w-100`}
      disabled={loading}
      {...props}
    >
      {/*
      children representa qualquer conteúdo que você passa entre as tags do componente.
      loading indica se o botão deve mostrar um texto de carregamento.
      */}
     {loading ? 'Carregando...' : children} {/* children representa qualquer conteúdo que você passa entre as tags do componente. */}
    </button >
  );
}




export default Button;