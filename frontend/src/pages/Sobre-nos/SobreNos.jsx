import "./SobreNos.css";
import EquipeCarrosel from "../../components/EquipeCarrosel/EquipeCarrosel";
import feiraLogo from '../../assets/logo-feira.jpg';
import progresso from '../../assets/progresso.png';
import missao from '../../assets/missao.png';

function SobreNos() {
  const temImagem = !!missao;

  return (
    <>
      <div className="sobrenos-container">
        
        <section className="container-fluid py-3 px-0">
          <div className="row g-0 align-items-center">
            <section className="col-12 col-md-6 p-3 order-1 order-md-1">
              <div className="mission-card">
                <h1 className="responsive-heading">
                  Olá!
                  <br />
                  Somos a feira-solidaria
                </h1>
                <p className="responsive-paragraph">
                  A Feira Solidária é um projeto criado por estudantes do programa Capacita Brasil,
                  com o propósito de incentivar a economia local e o consumo consciente.
                  Nossa equipe é formada por jovens apaixonados por inovação social e impacto positivo.
                  <br />
                  <br />
                  Continue lendo para saber mais sobre a feira solidaria
                </p>

              </div>

            </section>
            <section className="col-12 col-md-6 p-3 text-center order-2 order-md-2 p-0" >
              <div className="hero-image-container no-radius">
                <img
                  src={feiraLogo}
                  alt="Equipe de desenvolvime// você vai criar esse CSS a seguirnto"
                  className="img-fluid image-styled"
                />
              </div>
            </section>
          </div>
        </section>

        <section className="container-fluid py-3 px-0">
          <div className="row g-0 align-items-center">
            <section className="col-12 col-md-6 p-3 text-center order-2 order-md-1">
              <div className={`hero-image-container ${!temImagem ? '' : 'no-radius'}`}>
                {temImagem ? (
                  <img
                    src={missao}
                    alt="Equipe"
                    className="img-fluid image-styled"
                  />
                ) : (
                  <p className="image-placeholder">IMAGEM DA EQUIPE</p>
                )}
              </div>
            </section>
            <section className="col-12 col-md-6 p-3 order-1 order-md-2 p-4">
              <div className="mission-card">
                <h1 className="responsive-heading">
                  Nossa Missão
                </h1>
                <p className="responsive-paragraph">
                  Conectar pequenos produtores com consumidores locais,
                  promovendo trocas justas e fortalecendo a economia sustentável.
                  Queremos criar um ambiente onde todos saem ganhando.
                </p>
              </div>
            </section>
          </div>
        </section>

        <section className="container-fluid py-3 px-0">
          <div className="row g-0 align-items-center">
            <section className="col-12 col-md-6 p-3 m-0 order-1 order-md-1 p-4">
              <div className="mission-card">
                <h1 className="responsive-heading">
                  O que nos move
                </h1>
                <p className="responsive-paragraph">
                  Acreditamos que um consumo consciente transforma comunidades.
                  Por isso, buscamos impactar positivamente tanto quem produz quanto quem consome,
                  criando laços de confiança e respeito.
                </p>

              </div>

            </section>
            <section className="col-12 col-md-6 p-3 text-center order-2 order-md-2 p-0">
              <div className="hero-image-container no-radius">
                {<img
                  src={progresso}
                  alt="Imagem alusão ao progresso"
                  className="img-fluid image-styled"
                />}
              </div>
            </section>
          </div>
        </section>

        <EquipeCarrosel />
      </div>
    </>
  );
}

export default SobreNos;
