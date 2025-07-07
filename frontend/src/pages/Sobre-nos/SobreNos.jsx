import "./SobreNos.css";
import feiraLogo from '../../assets/logo-feira.jpg';

function SobreNos() {
  return (
    <>
      <div className="sobrenos-container">
        {/* Primeira seção: texto à esquerda e imagem à direita */}
        <section className="container py-5 p-4">
          <div className="row align-items-center">
            <section className="col-md-6 p-0 m-0 order-1 order-md-1">
              <div className="mission-card">
                <h1 className="responsive-heading">
                  Olá!
                  <br />
                  Somos a feira-solidaria
                </h1>
                <p className="responsive-paragraph">
                  Projeto desenvolvido por alunos do programa Capacita Brasil,
                  para fomentar o acesso a uma feira solidaria.
                  <br />
                  Continue lendo para saber mais sobre a feira solidaria
                </p>

              </div>

            </section>
            <section className="col-md-6 text-center order-2 order-md-2" >
              <div className="hero-image-container ">
                <img
                  src={feiraLogo}
                  alt="Equipe de desenvolvimento"
                  className="img-fluid image-styled"
                  style={{ maxWidth: '100%' }}
                />
              </div>
            </section>
          </div>
        </section>

        {/* Segunda seção: imagem à esquerda e texto à direita */}
        <section className="container py-4">
          <div className="row align-items-center">
            <section className="col-md-6 text-center order-2 order-md-1">
              <div className="hero-image-container">
                {/* <img src={equipeDesenvolvedora} alt="Equipe de desenvolvimento" className="img-fluid image-styled" /> */}
                <p className="image-placeholder">IMAGEM DA EQUIPE</p>
              </div>
            </section>
            <section className="col-md-6 order-1 order-md-2">
              <div className="mission-card">
                <h1 className="responsive-heading">
                  Nossa Missão
                </h1>
                <p className="responsive-paragraph">
                  Conectar pequenos produtores e consumidores promovendo a troca justa e o acesso a alimentos frescos e de qualidade.
                </p>
              </div>
            </section>
          </div>
        </section>

        {/* Seções futuras */}
        <section className="container py-4"></section>
        <section className="container py-4"></section>
      </div>
    </>
  );
}

export default SobreNos;
