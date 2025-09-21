import Slider from "react-slick";
import equipeMembros from "../../mocks/equipe.js";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./EquipeCarrosel.css";

function EquipeCarrosel() {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500, 
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "20px",
        },
      },
    ],
  };

  return (
    <>
      <div className="carousel-wrapper">
        <h2 className="text-center mb-4">Equipe de Desenvolvimento</h2>
        <Slider {...settings}>
          {equipeMembros.map((membro, index) => (
            <div key={index} className="team-card">
              <div className="image-container">
                <img
                  src={membro.foto || "https://via.placeholder.com/150"}
                  alt={membro.nome}
                  className="team-photo"
                />
                <div className="overlay-text">
                  <h4>
                    <a href={membro.github} target="_blank" rel="noopener noreferrer">
                      {membro.nome}
                    </a>
                  </h4>
                  <p>
                    {membro.linkedin ? (
                      <a href={membro.linkedin} target="_blank" rel="noopener noreferrer">
                        {membro.funcao}
                      </a>
                    ) : (
                      membro.funcao
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider >
      </div >
    </>

  );


}

export default EquipeCarrosel;