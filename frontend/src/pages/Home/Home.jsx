import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import produtoServices from '../../services/produtoServices';

import './Home.css';
import imagemcentral from '../../assets/alimentos/ImagemCentral.png';

function ProductCard({ produto }) {

  const imageUrl = produto.imagemUrl 
    ? `${import.meta.env.VITE_API_URL}${produto.imagemUrl}` 
    : 'https://placehold.co/400x300/E6F3E6/2A6441?text=Produto';

  return (
    <Link to={`/item/${produto.id}`} className="product-card-link">
      <div className="product-card">
        <div className="product-image-container">
          <img src={imageUrl} alt={produto.nomeProduto} className="product-card-image" />
        </div>
        <div className="product-card-info">
          <h4 className="product-card-title">{produto.nomeProduto}</h4>
          <p className="product-card-owner">Doado por: {produto.pessoa?.nome || 'Doador'}</p>
          <strong className="product-card-rating">Nota 5 ⭐⭐⭐⭐⭐</strong>
        </div>
      </div>
    </Link>
  );
}

function Home() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const dados = await produtoServices.listarProdutos(1);

        setProdutos(dados.produtos.slice(0, 4)); 

      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarProdutos();
  }, []);

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="mission-card">
          <h3>Nossa missão</h3>
          <p>
            Conectar pequenos produtores e consumidores, promovendo a troca justa e o acesso a alimentos frescos e de qualidade.
          </p>
        </div>
        <div className="hero-image-container">
          <img src={imagemcentral} alt="Cesta de vegetais e frutas frescas" />
        </div>
      </section>

      <section className="products-section">
        <h2>Produtos em Destaque</h2>
        
        {loading ? (
          <p className="loading-text">A carregar produtos...</p>
        ) : (
          <div className="products-grid">
            {produtos.map(produto => (
              <ProductCard key={produto.id} produto={produto} />
            ))}
          </div>
        )}

      </section>
    </div>
  );
}

export default Home;