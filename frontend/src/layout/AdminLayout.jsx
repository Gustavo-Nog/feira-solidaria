import { Outlet } from "react-router-dom";
import NavbarAdmin from "../components/Admin/NavbarAdmin/NavbarAdmin";
import Footer from "../components/Footer/Footer";

function AdminLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="d-md-none">
        <NavbarAdmin variant="mobile" />
      </div>

      <div className="flex-grow-1 d-flex">
        <aside
          className="d-none d-md-block bg-green position-sticky top-0"
          style={{ width: "220px", height: "100vh" }}
        >
          <NavbarAdmin variant="desktop" />
        </aside>

        <main className="flex-grow-1 d-flex flex-column p-4 overflow-auto">
          <div className="container-fluid flex-grow-1 d-flex flex-column">
            <Outlet />
          </div>
        </main>
      </div>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}

export default AdminLayout;