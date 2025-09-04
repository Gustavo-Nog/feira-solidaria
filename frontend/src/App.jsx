
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserProvider } from './context/UserContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import MainLayout from './layout/MainLayout';
import SobreNos from './pages/Sobre-nos/SobreNos';
import CadastrarItem from './pages/Cadastro-item/CadastroItem';
import Contato from './pages/Contato/Contato';
import RedefinirSenha from './pages/RedefinirSenha/RedefinirSenha';
import NovaSenha from './pages/NovaSenha/NovaSenha';
import ItemDetalhe from './pages/ItemDetalhe/ItemDetalhe';
import Produtos from './pages/Produtos/Produto';
import Carrinho from './pages/Carrinho/Carrinho';
import Perfil from './pages/Perfil/Perfil';

import './App.css';


function App() {
  {/* GoogleOAuthProvider recebe o clientId da variável de ambiente para configurar o SDK do Google */ }

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID} >
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          {/* Rotas que USAM o layout principal (com Navbar e Footer) */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/sobre-nos" element={<SobreNos />} />
            <Route path="/cadastrar-itens" element={<CadastrarItem />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/item/:itemId" element={<ItemDetalhe />} />
            <Route path="/perfil" element={<Perfil />} />

            {/* Se tivesse outras páginas com o mesmo layout, elas viriam aqui */}
          </Route>

          {/* Rotas que NÃO usam o layout (tela cheia) */}
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/redefinir-senha" element={<RedefinirSenha />} />
          <Route path="/redefinir-senha-nova" element={<NovaSenha />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider >

  );
}

export default App;
