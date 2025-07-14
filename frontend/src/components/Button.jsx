function Button({ children, loading, className = 'btn-warning', ...props }) {

  return (
    <button
      className={`btn ${className} w-100 text-light`}
      disabled={loading} // loading indica se o botão deve mostrar um texto de carregamento. 
      {...props}
    >
      {/* children representa qualquer conteúdo que você passa entre as tags do componente. */}
      {loading ? 'Carregando...' : children}
    </button >
  );
}




export default Button;