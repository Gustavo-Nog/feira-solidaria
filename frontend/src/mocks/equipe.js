{/* coloquem uma imagem de vocês com o nome do aquivo correspondente */ }
import gabrielFoto from "../assets/equipe/gabriel.png";
import gustavoFoto from "../assets/equipe/gustavo.jpg";
//  import henriqueFoto from "../assets/equipe/henrique.jpg";
import hudsonFoto from "../assets/equipe/hudson.jpg";
import mariannaFoto from "../assets/equipe/marianna.jpg";
import thierryFoto from "../assets/equipe/thierry.jpg";

const placeholder = "https://via.placeholder.com/150";

{/* Lembrem-se de tirar o placeholder da 'foto: placeholder' e substituam de acordo nome correspondente */ }

const membrosEquipe = [
  {
    nome: 'Gabriel',
    funcao: 'Fullstack',
    linkedin: 'https://www.linkedin.com/in/gabriel-silva-crispim-5765a92b1/',
    github: 'https://github.com/gabrielcrispim-c',
    foto: gabrielFoto
  },
  {
    nome: 'Gustavo',
    funcao: 'Fullstack',
    github: 'https://github.com/Gustavo-Nog',
    linkedin: 'https://www.linkedin.com/in/gustavo-alves-nogueira',
    foto: gustavoFoto

  },
  {
    nome: 'Henrique',
    funcao: 'Fullstack',
    linkedin: 'https://www.linkedin.com/in/henrique-adriel-241264262/',
    github: 'https://github.com/HenriqueAdriel',
    foto: placeholder
  },
  {
    nome: 'Hudson',
    funcao: 'Fullstack',
    linkedin: 'https://www.linkedin.com/in/hudson-levi-975414376/',
    github: 'https://github.com/Hudson2207',
    foto: hudsonFoto
  },
  {
    nome: 'Marianna',
    funcao: 'Fullstack',
    linkedin: 'https://www.linkedin.com/in/marianna-onofre-08039a338/',
    github: 'https://github.com/Marionofree',
    foto: mariannaFoto
  },
  {
    nome: 'Thierry',
    funcao: 'Fullstack',
    linkedin: 'https://www.linkedin.com/in/thierryuchoa/',
    github: 'https://github.com/Thierry-DV',
    foto: thierryFoto
  }
];

export default membrosEquipe;