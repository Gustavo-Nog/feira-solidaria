import feiraLogo from '../assets/logo-feira.jpg';

import imagemAlface from '../assets/Itens/alface.png';
import imagemTomate from '../assets/Itens/tomate.jpeg';
import imagemCenoura from '../assets/Itens/cenoura.png';
import imagemRepolho from '../assets/Itens/repolhoRoxo.jpeg';
import imagemBatata from '../assets/Itens/batataDoce.jpg';

const produtos = [
  {
    id: 1,
    nome: 'Tomate Italiano',
    descricao: 'Tomate maduro, ideal para molhos encorpados, pizzas e saladas. Cultivado sem agrotóxicos por produtores locais.',
    categoria: 'Fruto',
    imagem: imagemTomate,
    qualidade: 'Ótima',
    localizacao: 'Iguatu, CE',
    produtor: {
      nome: 'Produtor Local 1',
      nota: 4.5
    }
  },
  {
    id: 2,
    nome: 'Cenoura Orgânica',
    descricao: 'Cenouras frescas e crocantes, ricas em vitamina A. Perfeitas para consumo cru, sucos ou cozidas.',
    categoria: 'Raiz',
    imagem: imagemCenoura,
    qualidade: 'Boa',
    localizacao: 'Fortaleza, CE',
    produtor: {
      nome: 'Sítio Tradição',
      nota: 4.2
    }
  },
  {
    id: 3,
    nome: 'Maçã Nacional',
    descricao: 'Maçãs frescas, doces e crocantes. Excelente fonte de fibras, ideal para lanches e sobremesas.',
    categoria: 'Fruta',
    imagem: feiraLogo, // não tinha imagem própria, mantive genérica
    qualidade: 'Regular',
    localizacao: 'Quixadá, CE',
    produtor: {
      nome: 'Feirante Independente',
      nota: 3.9
    }
  },
  {
    id: 4,
    nome: 'Alface Crespa Orgânica',
    categoria: 'Folha',
    localizacao: 'Iguatu, CE',
    descricao: 'Alface fresca e crocante, cultivada sem agrotóxicos por produtores locais. Ideal para saladas e sanduíches saudáveis. Colhida no dia.',
    qualidade: 'Ótima',
    imagem: imagemAlface,
    produtor: {
      nome: 'Sítio Sol Nascente',
      nota: 4.8
    }
  },
  {
    id: 5,
    nome: 'Tomate Italiano',
    categoria: 'Fruto',
    localizacao: 'Crato, CE',
    descricao: 'Tomates frescos e maduros, ideais para molhos.',
    qualidade: 'Boa',
    imagem: imagemTomate,
    produtor: {
      nome: 'Fazenda Verde Vida',
      nota: 4.3
    }
  },
  {
    id: 6,
    nome: 'Cenoura Orgânica',
    categoria: 'Raiz',
    localizacao: 'Barbalha, CE',
    descricao: 'Cenouras crocantes e ricas em vitamina A.',
    qualidade: 'Ótima',
    imagem: imagemCenoura,
    produtor: {
      nome: 'Sítio Harmonia',
      nota: 4.7
    }
  },
  {
    id: 7,
    nome: 'Batata Doce Roxa',
    categoria: 'Raiz',
    localizacao: 'Icó, CE',
    descricao: 'Batatas doces com alto teor nutritivo.',
    qualidade: 'Boa',
    imagem: imagemBatata,
    produtor: {
      nome: 'Agricultor Zé Luiz',
      nota: 4.4
    }
  },
  {
    id: 8,
    nome: 'Repolho Roxo',
    categoria: 'Folha',
    localizacao: 'Juazeiro do Norte, CE',
    descricao: 'Repolho ideal para saladas e refogados.',
    qualidade: 'Regular',
    imagem: imagemRepolho,
    produtor: {
      nome: 'Cooperativa Verde Esperança',
      nota: 3.8
    }
  }
];

export default produtos;
