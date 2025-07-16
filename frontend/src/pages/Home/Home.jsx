import React from 'react';
// Importe aqui as imagens que você vai usar, como no protótipo
// import imagemVegetais from '../assets/vegetais.png';
import Vegetais from '../assets/vegetais.jpg';
import cesta1 from '../assets/cesta1.jpg';
import cesta2 from '../assets/cesta2.png';
import cesta3 from '../assets/cesta3.jpg';
import './Home.css';


function Home() {
  return (
    <div className="home-container">
      {/* Seção 1: Missão e Imagem Principal */}
      <section className="hero-section">
        <div className="mission-card">
          <h3>Nossa missão</h3>
          <p>
            Conectar pequenos produtores e consumidores, promovendo a troca justa e o acesso a alimentos frescos e de qualidade.
          </p>
        </div>
        <div className="hero-image-container">
        <img src={Vegetais} alt="Cesta de vegetais" />
        </div>
      </section>

      {/* Seção 2: Cestas em Destaque */}
      <section className="products-section">
        <h2>Conheça nossas cestas</h2>
        <div className="products-grid">
          {/* Exemplo de card de produto */}
          <div className="product-card">
            <div className="product-image-placeholder">Cesta1</div>
            <img src={cesta1} alt="Cesta 1" />
            <strong>Nota 5 ⭐⭐⭐⭐⭐</strong>
          </div>
          <div className="product-card">
            <div className="product-image-placeholder">Cesta2</div>
             <img src={cesta2} alt="Cesta 2" />
            <strong>Nota 5 ⭐⭐⭐⭐⭐</strong>
          </div>
          <div className="product-card">
            <div className="product-image-placeholder">Cesta 3</div>
            <img src={cesta3} alt="Cesta 3" />
            <strong>Nota 4 ⭐⭐⭐⭐</strong>
          </div>
        </div>
      </section>

      <div style={{ paddingBottom: '80px' }}>
         {/* Adicionado padding para o conteúdo não ficar atrás do footer */}
      </div>
    </div>
  )
}

export default Home;