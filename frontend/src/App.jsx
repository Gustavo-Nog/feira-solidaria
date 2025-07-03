import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import MainLayout from './layout/MainLayout'; // Importe o layout

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas que USAM o layout principal (com Navbar e Footer) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          {/* Se tivesse outras páginas com o mesmo layout, elas viriam aqui */}
          {/* <Route path="/carrinho" element={<Carrinho />} /> */}
        </Route>

        {/* Rotas que NÃO usam o layout (tela cheia) */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;