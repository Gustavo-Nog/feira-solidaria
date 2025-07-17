import './Home.css';
import imagemcentral from '../../assets/alimentos/ImagemCentral.png';
import cesta1 from '../../assets/alimentos/Cesta1.png';
import cesta2 from '../../assets/alimentos/Cesta2.png';
import cesta3 from '../../assets/alimentos/Cesta3.png';
import { Link } from 'react-router-dom';

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
          
          <Link to="/item/1" className="product-card-link">
            <div className="product-card">
              <img src={cesta1} alt="Cesta de produtos 1" className="product-card-image" />
              <strong>Nota 5 ⭐⭐⭐⭐⭐</strong>
            </div>
          </Link>

          <Link to="/item/2" className="product-card-link">
            <div className="product-card">
              <img src={cesta2} alt="Cesta de produtos 2" className="product-card-image" />
              <strong>Nota 5 ⭐⭐⭐⭐⭐</strong>
            </div>
          </Link>

          <Link to="/item/3" className="product-card-link">
            <div className="product-card">
                <img src={cesta3} alt="Cesta de produtos 3" className="product-card-image" />
                <strong>Nota 4 ⭐⭐⭐⭐</strong>
            </div>
          </Link>

        </div>
      </section>
    </div>
  )
}

export default Home;