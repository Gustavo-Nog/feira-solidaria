import { FaUsers, FaBasketShopping, FaHandshake } from 'react-icons/fa6';
import { MdCategory } from "react-icons/md";
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="d-flex flex-column flex-grow-1 h-100 gap-3">
      <div className="d-flex flex-grow-1 gap-3">
        <div className="flex-grow-1 bg-success text-white d-flex flex-column justify-content-center align-items-center border">
          <Link to="/usuarios" className="text-white text-decoration-none d-flex flex-column align-items-center justify-content-center h-100 w-100">
            <h2>Total de Usuários</h2>
            <FaUsers size={100} />
            <span className="display-4">0</span>
          </Link>
        </div>

        <div className="flex-grow-1 bg-success text-white d-flex flex-column justify-content-center align-items-center border">
          <Link to="/listar-produtos" className="text-white text-decoration-none d-flex flex-column align-items-center justify-content-center h-100 w-100">
            <h2>Total de Produtos</h2>
            <FaBasketShopping size={100} />
            <span className="display-4">0</span>
          </Link>
        </div>
      </div>

      <div className="d-flex flex-grow-1 gap-3">
        <div className="flex-grow-1 bg-success text-white d-flex flex-column justify-content-center align-items-center border">
          <Link to="/categorias" className="text-white text-decoration-none d-flex flex-column align-items-center justify-content-center h-100 w-100">
            <h5>Categorias</h5>
            <MdCategory size={100} />
            <span className="display-4">0</span>
          </Link>
        </div>

        <div className="flex-grow-1 bg-success text-white d-flex flex-column justify-content-center align-items-center border">
          <Link to="/acoes-adm" className="text-white text-decoration-none d-flex flex-column align-items-center justify-content-center h-100 w-100">
            <h5>Ações Administrativas</h5>
            <FaHandshake size={100} />
            <span className="display-4">25</span>
          </Link>
        </div>

        <div className="flex-grow-1 bg-success text-white d-flex flex-column justify-content-center align-items-center border">
          <Link to="/" className="text-white text-decoration-none d-flex flex-column align-items-center justify-content-center h-100 w-100">
            <h5>Novos Cadastros</h5>
            <FaHandshake size={100} />
            <span className="display-4">5</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
