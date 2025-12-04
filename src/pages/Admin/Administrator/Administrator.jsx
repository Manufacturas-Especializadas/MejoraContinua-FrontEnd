import { useEffect, useState } from "react";
import config from "../../../../config";
import IdeaTable from "../../../components/IdeaTable/IdeaTable";
import Swal from "sweetalert2";

const Administrator = () => {
    const [ideaList, setIdeaList] = useState([]);
    const [filteredIdeas, setFilteredIdeas] = useState([]);
    const [download, setDownload] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

    const statusOptions = [
        { value: "", label: "Todos los estatus" },
        { value: "Enviada", label: "Enviada" },
        { value: "En proceso", label: "En proceso" },
        { value: "No aprobada", label: "No aprobada" },
        { value: "Implementada", label: "Implementada" }
    ];

    useEffect(() => {
        const getIdeaList = async () => {
            try {
                const response = await fetch(`${config.apiUrl}/ContinuousImprovementForm/GetListIdeas`);
                if (!response.ok) {
                    throw new Error("Error al obtener los datos");
                }

                const data = await response.json();
                setIdeaList(data);
                setFilteredIdeas(data);
                setError(null);
            } catch (error) {
                console.error("Error: ", error);
                setIdeaList([]);
                setFilteredIdeas([]);
                setError("Error al cargar las ideas");
            } finally {
                setLoading(false);
            }
        };
        getIdeaList();
    }, []);

    useEffect(() => {
        let filtered = ideaList;

        if (searchTerm.trim() !== "") {
            filtered = filtered.filter(idea =>
                idea.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                idea.workArea?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                idea.currentSituation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                idea.ideaDescription?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedStatus !== "") {
            filtered = filtered.filter(idea =>
                idea.status === selectedStatus
            );
        }

        setFilteredIdeas(filtered);
    }, [searchTerm, selectedStatus, ideaList]);

    const getCurrentDateTime = () => {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}${month}${year}_${hours}${minutes}`;
    };

    const handleExport = async () => {
        try {
            setDownload(true);

            Swal.fire({
                title: "Generando reporte",
                html: "Por favor espere mientras se prepara tu archivo...",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            const url = `${config.apiUrl}/ContinuousImprovementForm/DownloadExcel`;

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: null
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const blob = await response.blob();

            const urlBlob = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = urlBlob;

            const fileName = `DatosExportados_${getCurrentDateTime()}.xlsx`;
            link.setAttribute("download", fileName);

            document.body.appendChild(link);
            link.click();
            link.remove();

            Swal.close();

            Swal.fire({
                icon: "success",
                title: "Descarga completa",
                text: "El archivo se ha descargado correctamente",
                timer: 2000,
                showConfirmButton: false
            });
        } catch (error) {
            console.error("Error al exportar: ", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo descargar el archivo",
                timer: 2000,
                showConfirmButton: false
            });
        } finally {
            setDownload(false);
        }
    };

    const handleClearFilters = () => {
        setSearchTerm("");
        setSelectedStatus("");
    };

    return (
        <>
            <div className="min-h-screen bg-gray-50 p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                            Administra las ideas registradas
                        </h1>

                        <div className="flex space-x-3 mt-4 md:mt-0">
                            <button
                                className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-md
                                transition-colors hover:cursor-pointer disabled:opacity-50"
                                disabled={loading || download}
                                onClick={handleExport}
                            >
                                {download ? "Descargando..." : "Descargar información"}
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
                        <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-4 md:space-y-0">
                            <div className="flex-1">
                                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                                    Buscar ideas
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="search"
                                        placeholder="Buscar por nombre, área, situación o descripción..."
                                        className="w-full p-3 pl-10 border border-gray-300 rounded-md 
                                        shadow-sm focus:outline-none focus:ring-2 focus:ring-primary 
                                        focus:border-primary"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <span className="absolute left-3 top-3 text-gray-400">
                                        🔍
                                    </span>
                                </div>
                            </div>

                            <div className="md:w-64">
                                <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-2">
                                    Filtrar por estatus
                                </label>
                                <select
                                    id="statusFilter"
                                    className="w-full p-3 border border-gray-300 rounded-md 
                                    shadow-sm focus:outline-none focus:ring-2 focus:ring-primary 
                                    focus:border-primary bg-white"
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                >
                                    {statusOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-end">
                                <button
                                    onClick={handleClearFilters}
                                    className="px-4 py-3 border border-gray-300 text-gray-700 
                                    rounded-md hover:bg-gray-50 transition-colors whitespace-nowrap"
                                >
                                    Limpiar filtros
                                </button>
                            </div>
                        </div>

                        {(searchTerm || selectedStatus) && (
                            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-sm text-blue-700 font-medium">
                                        Filtros aplicados:
                                    </span>

                                    {searchTerm && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full 
                                        text-sm bg-blue-100 text-blue-800">
                                            Búsqueda: "{searchTerm}"
                                            <button
                                                onClick={() => setSearchTerm("")}
                                                className="ml-2 text-blue-600 hover:text-blue-800"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    )}

                                    {selectedStatus && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full 
                                        text-sm bg-blue-100 text-blue-800">
                                            Estatus: {statusOptions.find(opt => opt.value === selectedStatus)?.label}
                                            <button
                                                onClick={() => setSelectedStatus("")}
                                                className="ml-2 text-blue-600 hover:text-blue-800"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    )}

                                    <button
                                        onClick={handleClearFilters}
                                        className="ml-auto text-sm text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        Limpiar todos
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="mt-4 flex justify-between items-center">
                            <div className="text-sm text-gray-600">
                                Mostrando <span className="font-semibold">{filteredIdeas.length}</span> de{" "}
                                <span className="font-semibold">{ideaList.length}</span> ideas
                            </div>

                            {filteredIdeas.length === 0 && ideaList.length > 0 && (
                                <div className="text-sm text-orange-600">
                                    No se encontraron resultados con los filtros aplicados
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-4">
                        {loading ? (
                            <div className="py-12 text-center text-gray-500">
                                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 
                                border-b-2 border-primary mb-4"></div>
                                <p>Cargando datos...</p>
                            </div>
                        ) : error ? (
                            <div className="py-12 text-center">
                                <div className="text-red-500 font-medium mb-2">
                                    {error}
                                </div>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="bg-primary text-white px-4 py-2 rounded-md
                                    hover:bg-secondary transition-all"
                                >
                                    Reintentar
                                </button>
                            </div>
                        ) : (
                            <>
                                {filteredIdeas.length > 0 ? (
                                    <IdeaTable
                                        data={filteredIdeas}
                                        searchTerm={searchTerm}
                                        onSearchChange={setSearchTerm}
                                    />
                                ) : (
                                    <div className="py-12 text-center">
                                        <div className="text-gray-500 mb-4">
                                            {ideaList.length === 0
                                                ? "No hay ideas registradas"
                                                : "No se encontraron ideas con los filtros aplicados"}
                                        </div>
                                        {ideaList.length > 0 && (
                                            <button
                                                onClick={handleClearFilters}
                                                className="bg-primary text-white px-4 py-2 rounded-md
                                                hover:bg-secondary transition-all"
                                            >
                                                Ver todas las ideas
                                            </button>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Administrator;