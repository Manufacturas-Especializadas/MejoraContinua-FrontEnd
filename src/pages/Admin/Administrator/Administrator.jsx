import { useEffect, useState } from "react";
import config from "../../../../config";
import IdeaTable from "../../../components/IdeaTable/IdeaTable";
import Swal from "sweetalert2";

const Administrator = () => {
    const [ideaList, setIdeaList] = useState([]);
    const [download, setDownload] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const getIdeaList = async () => {
            try {
                const response = await fetch(`${config.apiUrl}/ContinuousImprovementForm/GetListIdeas`);
                if (!response.ok) {
                    throw new Error("Error al obtener los datos");
                }

                const data = await response.json();
                setIdeaList(data);
                setError(null);
            } catch (error) {
                console.error("Error: ", error);
                setIdeaList([]);
            } finally {
                setLoading(false);
            }
        }
        getIdeaList();
    }, []);

    const getCurrentDateTime = () => {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth()).padStart(2, '0');
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

            const ulr = `${config.apiUrl}/ContinuousImprovementForm/DownloadExcel`;

            const response = await fetch(ulr, {
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
        } finally {
            setDownload(false);
        }
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50 p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <h1>Administra las ideas registradas</h1>

                        <div className="flex space-x-3">
                            <button className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-md
                            transition-colors hover:cursor-pointer" disabled={loading} onClick={() => handleExport()}>
                                Descargar información
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-4">
                        {
                            loading ? (
                                <div className="py-12 text-center text-gray-500">
                                    Cargando datos...
                                </div>
                            ) : error ? (
                                <div className="py-12 text-center">
                                    <div className="text-red-500 font-medium mb-2">
                                        {error}
                                    </div>
                                    <button className="bg-primary text-white px-4 py-2 rounded-md
                                        hover:bg-secondary transition-all">
                                        Reintentar
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <IdeaTable data={ideaList} searchTerm={searchTerm} onSearchChange={searchTerm} />
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}


export default Administrator