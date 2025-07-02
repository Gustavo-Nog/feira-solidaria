import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div>
        <Link to="/login"> Já tenho conta</Link>
        <Link to="/cadastro"> Criar conta</Link>
      </div>

      <div>
        <h1>Bem vindo a pagina principal</h1>
        <p>
          Sistema para Feira soliddaria, desenvolvidos por alunos do programa Capacita Brasil.
        </p>
      </div>
    </>
  )
}

export default Home;