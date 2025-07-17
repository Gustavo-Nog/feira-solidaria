import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import produtos from '../../mocks/produtos';

import Button from '../../components/Button/Button';
import './Produto.css';

const categorias = [...new Set(produtos.map(produto => produto.categoria))];

function Produtos() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');

  const verDetalhes = (id) => {
    navigate(`/item/${id}`);
  };

  const produtosFiltrados = produtos.filter(
    (produto) =>
      produto.nome.toLowerCase().includes(busca.toLowerCase()) &&
      (categoriaSelecionada === '' || produto.categoria === categoriaSelecionada)
  );

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Produtos Disponíveis</h1>

      <form className="row mb-4">
        <div className="col-md-6 mb-3">
          <label htmlFor="busca" className="form-label">Buscar por nome</label>
          <input
            id="busca"
            type="text"
            className="form-control"
            placeholder="Digite o nome do produto"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="categoria" className="form-label">Filtrar por categoria</label>
          <select
            id="categoria"
            className="form-select"
            value={categoriaSelecionada}
            onChange={(e) => setCategoriaSelecionada(e.target.value)}
          >
            <option value="">Todas as categorias</option>
            {categorias.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </form>

      <div className="row g-4">
        {produtosFiltrados.map((produto) => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={produto.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={produto.imagem}
                alt={produto.nome}
                className="card-img-top"
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{produto.nome}</h5>
                <p className="card-text text-muted" style={{ fontSize: '0.9rem' }}>
                  {produto.descricao}
                </p>
                <span className="badge bg-primary mb-2 align-self-start">
                  {produto.categoria}
                </span>
                <div className="mb-2 text-warning">★★★★★</div>
                <Button size="small" onClick={() => verDetalhes(produto.id)}>
                  Ver Detalhes
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Produtos;
