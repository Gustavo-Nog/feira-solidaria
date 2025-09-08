import React from 'react';
import { Link } from 'react-router-dom';

import './Home.css';
import imagemcentral from '../../assets/alimentos/ImagemCentral.png';
import cesta1 from '../../assets/alimentos/Cesta1.png';
import cesta2 from '../../assets/alimentos/Cesta2.png';
import cesta3 from '../../assets/alimentos/Cesta3.png';

const produtosExemplo = [
  { id: 1, imagem: cesta1, nota: 'Nota 5 ⭐⭐⭐⭐⭐' },
  { id: 2, imagem: cesta2, nota: 'Nota 5 ⭐⭐⭐⭐⭐' },
  { id: 3, imagem: cesta3, nota: 'Nota 4 ⭐⭐⭐⭐' },
];

function Home() {
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
        <h2>Conheça nossas cestas</h2>
        <div className="products-grid">
          {produtosExemplo.map(produto => (
            <Link key={produto.id} to={`/item/${produto.id}`} className="product-card-link">
              <div className="product-card">
                <img src={produto.imagem} alt={`Cesta de produtos ${produto.id}`} className="product-card-image" />
                <strong>{produto.nota}</strong>
              </div>
            </Link>
          ))}

        </div>
      </section>
    </div>
  );
}

export default Home;