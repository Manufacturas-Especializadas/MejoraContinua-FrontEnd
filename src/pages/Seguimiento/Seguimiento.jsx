import { useEffect, useState } from "react";
import IdeaCard from "../../components/IdeaCard/IdeaCard";
import config from "../../../config";

const ITEMS_PER_PAGE = 6;

const Seguimiento = () => {
    const [listIdeas, setListIdeas] = useState([]);
    const [currentPages, setCurrentPages] = useState({ 2026: 1, 2025: 1 });
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("2026");

    useEffect(() => {
        setCurrentPages(prev => ({
            ...prev,
            [activeTab]: 1
        }));
    }, [activeTab]);

    useEffect(() => {
        const getListIdeas = async () => {
            try {
                const response = await fetch(`${config.apiUrl}/ContinuousImprovementForm/GetListIdeas`);
                const data = await response.json();
                console.log("Ideas: ", data);
                setListIdeas(data);
            } catch (error) {
                console.error("Error en el fetching: ", error);
            } finally {
                setLoading(false);
            }
        };

        getListIdeas();
    }, []);

    const filteredIdeas = listIdeas.filter(idea =>
        idea.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getIdeasByYear = (year) => {
        const yearIdeas = filteredIdeas.filter(idea => idea.year === year);

        return yearIdeas;
    };

    const ideas2026 = getIdeasByYear(2026);
    const ideas2025 = getIdeasByYear(2025);

    const currentYearIdeas = activeTab === "2026" ? ideas2026 : ideas2025;

    const totalPages = Math.ceil(currentYearIdeas.length / ITEMS_PER_PAGE);
    const currentPage = currentPages[activeTab];

    const paginatedIdeas = currentYearIdeas.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const goToPrevious = () => {
        setCurrentPages(prev => ({
            ...prev,
            [activeTab]: Math.max(prev[activeTab] - 1, 1)
        }));
    };

    const goToNext = () => {
        setCurrentPages(prev => ({
            ...prev,
            [activeTab]: Math.min(prev[activeTab] + 1, totalPages)
        }));
    };

    const IdeasSection = () => {
        return (
            <div className="mt-6">
                {activeTab === "2025" && (
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center">
                            <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm text-blue-700">
                                Mostrando solo ideas con estatus <span className="font-semibold">"En proceso"</span>
                            </span>
                        </div>
                    </div>
                )}

                {paginatedIdeas.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            {searchTerm
                                ? `No se encontraron ideas que coincidan con "${searchTerm}" en ${activeTab}`
                                : activeTab === "2025"
                                    ? `No hay ideas con estatus "En proceso" en ${activeTab}`
                                    : `No hay ideas registradas en ${activeTab}`}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {paginatedIdeas.map((idea, index) => (
                            <div key={`${activeTab}-${index}`}>
                                <IdeaCard idea={idea} />
                            </div>
                        ))}
                    </div>
                )}

                {currentYearIdeas.length > ITEMS_PER_PAGE && (
                    <div className="mt-10 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                        <div className="text-sm text-gray-600">
                            Mostrando {(currentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, currentYearIdeas.length)} de {currentYearIdeas.length} ideas
                        </div>

                        <div className="flex items-center space-x-4">
                            <button
                                onClick={goToPrevious}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 rounded-md transition-colors ${currentPage === 1
                                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                                    }`}
                            >
                                ← Anterior
                            </button>

                            <div className="flex items-center space-x-2">
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }

                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => setCurrentPages(prev => ({ ...prev, [activeTab]: pageNum }))}
                                            className={`w-8 h-8 rounded-full flex items-center justify-center ${currentPage === pageNum
                                                ? "bg-indigo-600 text-white"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                onClick={goToNext}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 rounded-md transition-colors ${currentPage === totalPages
                                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                                    }`}
                            >
                                Siguiente →
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-800 mb-3">
                    Seguimiento de Ideas
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Consulta el estado de tus ideas de mejora continua organizadas por año
                </p>
            </header>

            <div className="mb-8">
                <div className="relative max-w-xl mx-auto">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar ideas por nombre..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                    />
                </div>
            </div>

            <div className="mb-8">
                <div className="border-b border-gray-200">
                    <nav className="flex justify-center space-x-8" aria-label="Tabs">
                        <button
                            onClick={() => setActiveTab("2026")}
                            className={`py-4 px-1 border-b-2 font-medium text-lg flex items-center ${activeTab === "2026"
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                        >
                            Ideas 2026
                            <span className={`ml-2 px-2 py-1 text-xs rounded-full ${activeTab === "2026"
                                ? "bg-indigo-100 text-indigo-800"
                                : "bg-gray-100 text-gray-800"
                                }`}>
                                {ideas2026.length}
                            </span>
                        </button>

                        <button
                            onClick={() => setActiveTab("2025")}
                            className={`py-4 px-1 border-b-2 font-medium text-lg flex items-center ${activeTab === "2025"
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                        >
                            Ideas 2025
                            <span className={`ml-2 px-2 py-1 text-xs rounded-full ${activeTab === "2025"
                                ? "bg-indigo-100 text-indigo-800"
                                : "bg-gray-100 text-gray-800"
                                }`}>
                                {ideas2025.length}
                            </span>
                        </button>
                    </nav>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
                        <p className="text-gray-600">Cargando ideas...</p>
                    </div>
                </div>
            ) : (
                <IdeasSection />
            )}

            {searchTerm && (
                <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-blue-700">
                                Mostrando resultados para: <strong>"{searchTerm}"</strong>
                            </span>
                        </div>
                        <button
                            onClick={() => setSearchTerm("")}
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                            Limpiar filtro
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Seguimiento;