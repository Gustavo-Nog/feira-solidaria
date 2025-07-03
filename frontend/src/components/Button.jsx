function Button({ children, loading, className = 'btn-warning', ...props }) {

  return (
    <button
      className={`btn ${className} w-100`}
      disabled={loading} {/* loading indica se o botão deve mostrar um texto de carregamento. */}
      {...props}
    >
      {loading ? 'Carregando...' : children} {/* children representa qualquer conteúdo que você passa entre as tags do componente. */}
    </button >
  );
}




export default Button;