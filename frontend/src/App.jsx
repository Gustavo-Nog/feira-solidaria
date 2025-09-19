
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ProtectedRoute from './components/ProtectedRoute/protectedRoute';
import AdminRoute from './components/AdminRoute/adminRoute';

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
import EditarItem from "./pages/Itens/EditarItem";

import AdminLayout from './layout/AdminLayout';
import Admin from './pages/Admin/Admin';
import Dashboard from './pages/Admin/Dashboard/AdminDashboard';
import UsuariosLista from './pages/Admin/Usuarios/Usuarios';
import ProdutosAdmin from './pages/Admin/ProdutosAdmin/ProdutosAdmin';
import Categoria from './pages/Admin/Categoria/Categoria';
import AcoesAdm from './pages/Admin/acoesAdm/AcoesAdm';

import './App.css';

function App() {

  return (
      <BrowserRouter>
        <UserProvider>
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
              <Route path="/contato" element={<Contato />} />
              <Route path="/produtos" element={<Produtos />} />
              <Route path="/item/:itemId" element={<ItemDetalhe />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/cadastrar-itens" element={<CadastrarItem />} />
                <Route path="/carrinho" element={<Carrinho />} />
                <Route path="/editar-item/:id" element={<EditarItem />} />
                <Route path="/perfil" element={<Perfil />} />
                {/* Se tivesse outras páginas com o mesmo layout, elas viriam aqui */}
              </Route>
            </Route>

            <Route element={<AdminRoute />}>
              <Route element={<AdminLayout />}>
                {/* Rotas que Usam o layout de Administradores */}
                <Route path='/admin' element={<Admin />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/usuarios' element={<UsuariosLista />} />
                <Route path='/listar-produtos' element={<ProdutosAdmin />} />
                <Route path='/categorias' element={<Categoria />} />
                <Route path='/acoes-adm' element={<AcoesAdm />} />
                {/* <Route path='/configuracoes' element={<Configuracoes />} /> */}
              </Route>
            </Route>
            
            {/* Rotas que NÃO usam o layout (tela cheia) */}
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/redefinir-senha" element={<RedefinirSenha />} />
            <Route path="/redefinir-senha-nova" element={<NovaSenha />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
  );
}

export default App;
