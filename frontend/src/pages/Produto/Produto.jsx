// Importa o React e o hook de navegação do React Router
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Importa o componente de botão padrão e uma imagem provisória
import Button from '../../components/Button/Button';
import feiraLogo from '../../assets/logo-feira.jpg';

import './Produto.css';

// Simula uma lista de produtos (mock), cada um com dados básicos
const mockProdutos = [
  {
    id: 1,
    nome: 'Produto 1',
    descricao: 'Este é um produto de exemplo 1.',
    categoria: 'Categoria A',
    imagem: feiraLogo, // usa imagem provisória por enquanto
  },
  {
    id: 2,
    nome: 'Produto 2',
    descricao: 'Este é um produto de exemplo 2.',
    categoria: 'Categoria B',
    imagem: feiraLogo,
  },
  {
    id: 3,
    nome: 'Produto 3',
    descricao: 'Este é um produto de exemplo 3.',
    categoria: 'Categoria C',
    imagem: feiraLogo,
  },
];

// Função principal que monta a tela de produtos
function Produtos() {
  const navigate = useNavigate(); // permite navegar para outra página

  // Função que leva o usuário para a tela de detalhe do produto
  const verDetalhes = (id) => {
    navigate(`/item/${id}`); // redireciona para /item/1, /item/2 etc.
  };

  return (
    <div className="produtos-container container py-5">
      <h1 className="mb-4">Produtos Disponíveis</h1>

      {/* Cria uma grade (row) de produtos */}
      <div className="row g-4">

        {/* Para cada produto na lista, cria um cartão visual */}
        {mockProdutos.map((produto) => (
          <div className="col-md-4" key={produto.id}>
            <div className="card h-100 shadow-sm">

              {/* Imagem do produto */}
              <img src={produto.imagem} alt={produto.nome} className="card-img-top" />

              {/* Corpo do cartão com nome, descrição e botão */}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{produto.nome}</h5>
                <p className="card-text text-muted">{produto.descricao}</p>

                {/* Categoria do produto como um selo */}
                <span className="badge bg-primary mb-3">{produto.categoria}</span>

                {/* Botão de detalhes, chama a função verDetalhes */}
                <Button onClick={() => verDetalhes(produto.id)}>
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

