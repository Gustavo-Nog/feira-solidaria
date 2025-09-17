import { Outlet } from "react-router-dom";
import NavbarAdmin from "../components/Admin/NavbarAdmin/NavbarAdmin";
import Footer from "../components/Footer/Footer";

function AdminLayout() {
  return (
    <div className="container-fluid">
      <div className="row">
        <nav className="col-1 col-md-2 bg-green vh-100 p-3">
          <NavbarAdmin />
        </nav>

        <main className="col-11 col-md-10 p-4">
          <Outlet />
        </main>
      </div>

      <footer className="row bg-dark text-light text-center py-3">
        <Footer />
      </footer>
    </div>
  );
}

export default AdminLayout;
