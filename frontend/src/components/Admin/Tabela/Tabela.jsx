import "./Tabela.css";

function Tabela({ children }) {
  return (
    <div className="tabela-container">
      <table className="tabela-admin">
        {children}
      </table>
    </div>
  );
}

export default Tabela;
