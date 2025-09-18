import { Outlet } from "react-router-dom";
import NavbarAdmin from "../components/Admin/NavbarAdmin/NavbarAdmin";
import Footer from "../components/Footer/Footer";

function AdminLayout() {
  return (
<<<<<<< HEAD
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
=======
    <div className="container-fluid">
      <div className="row">
        <nav className="col-1 col-md-2 bg-green vh-100 p-3">
          <NavbarAdmin />
        </nav>

        <main className="col-11 col-md-10 p-4">
          <Outlet />
>>>>>>> b871ec5b9f581cf3bc2b5142d68be9ad4549eca7
        </main>
      </div>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}

export default AdminLayout;