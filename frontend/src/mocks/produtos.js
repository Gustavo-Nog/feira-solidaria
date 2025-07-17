import feiraLogo from '../assets/logo-feira.jpg';
import imagemAlface from '../assets/Itens/alface.png';

const produtos = [
  {
    id: 1,
    nome: 'Produto 1',
    descricao: 'Este é um produto de exemplo 1.',
    categoria: 'Talo',
    imagem: feiraLogo,
    qualidade: 'Ótima',
    localizacao: 'Iguatu, CE',
    produtor: {
      nome: 'Produtor Local 1',
      nota: 4.5
    }
  },
  {
    id: 2,
    nome: 'Produto 2',
    descricao: 'Produto de exemplo 2.',
    categoria: 'Legume',
    imagem: feiraLogo,
    qualidade: 'Boa',
    localizacao: 'Fortaleza, CE',
    produtor: {
      nome: 'Sítio Tradição',
      nota: 4.2
    }
  },
  {
    id: 3,
    nome: 'Produto 3',
    descricao: 'Produto de exemplo 3.',
    categoria: 'Outro',
    imagem: feiraLogo,
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
];

export default produtos;