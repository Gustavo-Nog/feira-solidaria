import React from 'react';
import { useParams } from 'react-router-dom';
import { mockItem } from '../../mocks/itens'; // 1. Importando os dados do local correto
import './ItemDetalhe.css'; // Vamos usar um CSS mais simples agora

function ItemDetalhe() {
  const { itemId } = useParams();
  const item = mockItem; // Usando os dados importados

  if (!item) {
    return <div>Item não encontrado!</div>;
  }

  return (
    // 2. Usando classes do Bootstrap para o container principal
    <div className="container my-5">
      <div className="card p-4 shadow-sm">
        {/* 3. Usando o sistema de Grid do Bootstrap (row/col) */}
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
            
            {/* mt-auto empurra o botão para o final do card */}
            <button className="btn btn-lg btn-success mt-auto">
              Tenho Interesse / Fazer Troca
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetalhe;