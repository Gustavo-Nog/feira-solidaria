import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // 1. Importe o useNavigate
import { mockItem } from '../../mocks/itens';
import './ItemDetalhe.css';

// --- Simulação de Autenticação e Carrinho ---
// No seu projeto real, estes valores e funções viriam de um Contexto ou Redux.
const usuarioLogado = false; // Mude para 'false' para testar o redirecionamento para o login.

const adicionarAoCarrinho = (item) => {
  console.log(`Item "${item.nome}" adicionado ao carrinho!`);
  // Aqui você adicionaria a lógica real para atualizar o estado do carrinho.
};
// ---------------------------------------------

function ItemDetalhe() {
  const { itemId } = useParams();
  const navigate = useNavigate(); // 2. Inicialize o hook de navegação
  const item = mockItem;

  // 3. Crie a função que será chamada no clique do botão
  const handleAddToCart = () => {
    // Verifica se o usuário está logado
    if (usuarioLogado) {
      // Se estiver logado, adicione ao carrinho e redirecione
      adicionarAoCarrinho(item);
      alert(`"${item.nome}" foi adicionado ao seu carrinho!`);
      navigate('/carrinho'); // Redireciona para a página do carrinho
    } else {
      // Se não estiver logado, redirecione para a página de login
      alert('Você precisa estar logado para realizar esta ação. Redirecionando...');
      navigate('/login');
    }
  };

  if (!item) {
    return <div>Item não encontrado!</div>;
  }

  return (
    <div className="container my-5">
      <div className="card p-4 shadow-sm">
        <div className="row g-5">
          {/* Coluna da Imagem */}
          <div className="col-lg-5">
            <img src={item.imagem} alt={item.nome} className="img-fluid rounded" />
          </div>

          {/* Coluna das Informações */}
          <div className="col-lg-7 d-flex flex-column">
            <span className="badge bg-success align-self-start mb-2">{item.categoria}</span>
            <h1 className="item-nome mb-3">{item.nome}</h1>
            
            <div className="mb-4">
              <h5>Descrição</h5>
              <p className="text-muted">{item.descricao}</p>
            </div>
            
            <div className="row mb-4">
              <div className="col-md-6">
                <h5>Qualidade</h5>
                <p className="fw-bold">{item.qualidade}</p>
              </div>
              <div className="col-md-6">
                <h5>Localização</h5>
                <p>{item.localizacao}</p>
              </div>
            </div>

            <div className="mb-4">
              <h5>Disponibilizado por:</h5>
              <p>{item.produtor.nome} (Nota: {item.produtor.nota} ⭐)</p>
            </div>
            
            {/* O botão agora chama a nossa nova função */}
            <button className="btn btn-lg btn-success mt-auto" onClick={handleAddToCart}>
              Tenho Interesse / Fazer Troca
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetalhe;