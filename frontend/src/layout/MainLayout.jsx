import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

function MainLayout() {
  return (
    <>
      <Navbar />
      <main>
        {/* Outlet renderiza a rota filha, no nosso caso, a Home */}
        <Outlet /> 
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;