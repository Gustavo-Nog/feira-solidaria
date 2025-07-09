import './Home.css';
// Importe aqui as imagens que você vai usar, como no protótipo
// import imagemVegetais from '../assets/vegetais.png';

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
          {/* <img src={imagemVegetais} alt="Cesta de vegetais" /> */}
          <p className="image-placeholder">IMAGEM GRANDE DE VEGETAIS</p>
        </div>
      </section>

      {/* Seção 2: Cestas em Destaque */}
      <section className="products-section">
        <h2>Conheça nossas cestas</h2>
        <div className="products-grid">
          {/* Exemplo de card de produto */}
          <div className="product-card">
            <div className="product-image-placeholder">Cesta 1</div>
            <strong>Nota 5 ⭐⭐⭐⭐⭐</strong>
          </div>
          <div className="product-card">
            <div className="product-image-placeholder">Cesta 2</div>
            <strong>Nota 5 ⭐⭐⭐⭐⭐</strong>
          </div>
          <div className="product-card">
            <div className="product-image-placeholder">Cesta 3</div>
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