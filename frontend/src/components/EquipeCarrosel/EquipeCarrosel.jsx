import React from "react";
import Slider from "react-slick";
import equipeMembros from "../../mocks/equipe.js";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./EquipeCarrosel.css";

function EquipeCarrosel() {
  const settings = {
    className: "center",
    centerMode: true, // Ativa o modo em que o item do meio fica centralizado no carrossel
    infinite: true,   // Faz o carrossel "loopar" infinitamente
    centerPadding: "60px", // Define o "espaço" visível nas laterais dos slides
    slidesToShow: 3, // Quantos cards mostrar ao mesmo tempo (3 no desktop, 1 no mobile)
    speed: 500, // speed	Tempo da transição entre slides (500ms)
    responsive: [ // responsive	Quando a tela for menor que 768px, mostrar 1 card e menos padding
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
              <img
                src={membro.foto || "https://via.placeholder.com/150"}
                alt={membro.nome}
                className="team-photo"
              />
              <h4>
                <a key={membro.nome} href={membro.github} target="_blank" rel="noopener noreferrer" className="text-dark">
                  {membro.nome}
                </a>
              </h4>
              <p>{membro.nacionalidade}</p>
            </div>
          ))}
        </Slider >
      </div >
    </>

  );


}

export default EquipeCarrosel;