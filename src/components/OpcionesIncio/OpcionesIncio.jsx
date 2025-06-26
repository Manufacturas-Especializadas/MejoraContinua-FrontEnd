import { useNavigate } from "react-router-dom";

const OpcionesIncio = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <button
                    onClick={() => handleNavigate("/registroIdea") }
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg
                    border border-indigo-100 text-left transform transition duration-300
                    hover:-translate-y-1 focus:outline-none focus:right-2 focus:ring-indigo-500 hover:cursor-pointer"
                >
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 mb-4 bg-indigo-100 rounded-full
                            flex items-center justify-center">
                            <span className="text-indigo-600 text-2xl font-bold">📝</span>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            Registra tu idea
                        </h3>

                        <p className="text-sm text-gray-600">
                            Completa el formulario para registrar tu idea de mejora continua.
                        </p>
                    </div>
                </button>

                <button
                    onClick={ () => handleNavigate("/seguimiento") }
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg 
                    border border-blue-100 text-left transform transition duration-300 
                    hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:cursor-pointer"
                >
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 text-2xl font-bold">🔍</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Seguimiento</h3>
                        <p className="text-sm text-gray-600">
                            Consulta el estado de tus ideas registradas anteriormente.
                        </p>
                    </div>
                </button>
            </div>
        </>
    )
}

export default OpcionesIncio