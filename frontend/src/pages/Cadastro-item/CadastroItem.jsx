import './Cadastro-item.css';


function CadastrarItem() {
  return (

<div className="formulario-container">
  <h2>Cadastro de Item - Feira Solidária</h2>
  <form className="formulario">
    <div className="campo">
      <label htmlFor="nome">Nome do Produto:</label>
      <input type="text" id="nome" name="nome" required />
    </div>

    <div className="campo">
      <label htmlFor="categoria">Categoria:</label>
      <select id="categoria" name="categoria" required>
        <option value="">Selecione</option>
        <option value="Folha">Folha</option>
        <option value="Talo">Talo</option>
        <option value=" legume">legume</option>
        <option value="Outro">Outro</option>
      </select>
    </div>

    <div className="campo">
      <label htmlFor="localizacao">Localização (Bairro ou Cidade):</label>
      <input type="text" id="localizacao" name="localizacao" required />
    </div>

    <div className="campo">
      <label htmlFor="descricao">Descrição:</label>
      <textarea id="descricao" name="descricao" rows="3" required></textarea>
    </div>

    <div className="campo">
      <label htmlFor="qualidade">Qualidade:</label>
      <select id="qualidade" name="qualidade" required>
        <option value="">Selecione</option>
        <option value="otima">Otima</option>
        <option value="Boa">Boa</option>
        <option value="regular">Regular</option>
      </select>
    </div>

    <button type="submit" className="botao">Cadastrar Item</button>
  </form>
</div>
  )
}

export default CadastrarItem;