import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar/Navbar";
import OpcionesIncio from "../components/OpcionesIncio/OpcionesIncio";

const Layout = () => {
    const location = useLocation();

    const showHeader = location.pathname === '/';

    return (
        <>
            <Navbar />

            {/* Contenido principal */}
            <div className="max-w-2xl mx-auto px-4">
                {showHeader && (
                    <header className="mb-8 text-center pt-5">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Plataforma de Mejora Continua
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Registra tus ideas o consulta su estado.
                        </p>
                    </header>
                )}

                {location.pathname === '/' && <OpcionesIncio />}

            </div>
            {/* Rutas dinámicas */}
            <main className="mt-5 mx-auto px-4">
                <Outlet />
            </main>
        </>
    )
}

export default Layout