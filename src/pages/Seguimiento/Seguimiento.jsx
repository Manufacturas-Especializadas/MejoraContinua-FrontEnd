import { useEffect, useState } from "react";
import IdeaCard from "../../components/IdeaCard/IdeaCard";
import config from "../../../config";

const ITEMS_PER_PAGE = 4;

const Seguimiento = () => {
    const[listIdeas, setListIdeas] = useState([]);
    const[currentPages, setCurrentPages] = useState(1);
    const[loading, setLoading] = useState(true);
    const[searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setCurrentPages(1);
    }, [searchTerm]);

    useEffect(() => {
        const getListIdeas = async() => {
            try{
                const response = await fetch(`${config.apiUrl}/ContinuousImprovementForm/GetListIdeas`);
                const data = await response.json();
                setListIdeas(data)
            }catch(error){
                console.error("Error en el fetching: ",error);
            }
            finally{
                setLoading(false);
            }
        }

        getListIdeas()
    }, []);

    const filteredIdeas = listIdeas.filter(idea =>
        idea.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredIdeas.length / ITEMS_PER_PAGE);
    const currentIdeas = filteredIdeas.slice(
        (currentPages - 1) * ITEMS_PER_PAGE,
        currentPages * ITEMS_PER_PAGE
    );

    const goToPrevious = () => {
        setCurrentPages((prev) => Math.max(prev - 1, 1));
    };

    const goToNext = () => {
        setCurrentPages((prev) => Math.min(prev + 1, totalPages));
    };

    return (
        <>
            <div className="container px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Seguimiento de ideas
                </h1>

                <p className="text-center text-gray-600 mb-8">
                    Consulta el estado de tus ideas registradas
                </p>

                <div className="mb-6 flex justify-center">
                    <div className="relative w-full max-w-md">
                        <input                             
                            type="text"
                            placeholder="Buscar por nombre..."
                            className="w-full p-3 pl-10 border border-gray-300
                            rounded-md shadow-md focus:outline-none focus:ring-indigo-500
                            focus:border-indigo-500"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={ searchTerm }
                        />
                        <span className="absolute left-3 top-3 text-gray-400">🔍</span>
                    </div>
                </div>

                {loading && (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-10 w-10
                        border-t-2 border-indigo-600"></div>
                    </div>
                )}

                {!loading && (
                    <>
                        <div className="flex flex-col items-center">
                            {currentIdeas.length === 0 ? (
                                <p className="text-center text-gray-500">No se encontro el nombre</p>
                            ) : (
                                currentIdeas.map((idea, index) => (
                                    <div key={index} className="w-full md:w-3/4 lg:w-1/2 p-4">
                                        <IdeaCard idea={idea} />
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="mt-8 flex justify-center items-center space-x-4">
                            <button
                                onClick={ goToPrevious }
                                disabled={ currentPages === 1 }
                                className={`px-4 py-2 rounded-md hover:cursor-pointer ${
                                    currentPages === 1
                                    ? "bg-gray-200 cursor-not-allowed"
                                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                                }`}
                            >
                                Anterior
                            </button>

                            <span className="text-sm text-gray-600">
                                Página { currentPages } de { totalPages }
                            </span>

                            <button
                                onClick={ goToNext }
                                disabled={ currentPages === totalPages }
                                className={`px-4 py-2 rounded-md hover:cursor-pointer ${
                                    currentPages === totalPages
                                    ? "bg-gray-200 cursor-not-allowed"
                                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                                }`}
                            >
                                Siguiente
                            </button>
                        </div>
                    </>
                )}        
            </div>
        </>
    )
}

export default Seguimiento