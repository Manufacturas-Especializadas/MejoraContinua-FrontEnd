import { BrowserRouter, Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar/Navbar";
import { OpcionesIncio } from "../components/OpcionesIncio/OpcionesIncio";

const Layout = () => {
  const location = useLocation();

  const showHeader = location.pathname === "/";

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 pt-10">
        {showHeader && (
          <>
            <header className="mb-12 text-center">
              <h1
                className="text-4xl font-extrabold tracking-tight 
                text-slate-900 sm:text-5xl"
              >
                Plataforma de{" "}
                <span className="text-indigo-600">Mejora Continua</span>
              </h1>
              <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                Transforma tus ideas en soluciones. Registrar nuevas propuestas
                o gestiona el avance de tus proyectos actuales
              </p>
            </header>
            <OpcionesIncio />
          </>
        )}
      </div>

      <main className={`${showHeader ? "mt-16" : "mt-6"}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
