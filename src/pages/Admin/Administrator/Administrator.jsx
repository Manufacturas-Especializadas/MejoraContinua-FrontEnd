import { useEffect, useState } from "react";
import config from "../../../../config";
import IdeaTable from "../../../components/IdeaTable/IdeaTable";

const Administrator = () => {
    const[ideaList, setIdeaList] = useState([]);

    useEffect(() => {
        const getIdeaList = async () => {
            try{
                const response = await fetch(`${config.apiUrl}/ContinuousImprovementForm/GetListIdeas`);
                if(!response.ok){
                    throw new Error("Error al obtener los datos");
                }

                const data = await response.json();
                setIdeaList(data);
            }catch(error){
                console.error("Error: ", error);
            }
        }
        getIdeaList();
    },[]);

    const getCurrentDateTime = () => {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth()).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        return `${day}${month}${year}_${hours}${minutes}`;
    };

    const handleExport = async() => {
        try{
            const ulr = `${config.apiUrl}/ContinuousImprovementForm/DownloadExcel`;

            const response = await fetch(ulr, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: null
            });

            if(!response.ok){
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
        }catch(error){
            console.error("Error al exportar: ", error);
        }
    }

    return (
        <>
            <div className="container px-4 mx-auto">
                <h1 className="text-3xl font-bold text-gray-600 text-center">
                    Getión de ideas
                </h1>

                <p className="text-center text-gray-600">
                    Administra las ideas registrada en el sistema
                </p>

                <div className="flex justify-end mr-10">
                    <button
                        type="button"
                        onClick={ handleExport }
                        className="flex items-center px-4 
                        text-green-700 hover:text-green-900
                        rounded-md transition duration-200
                        hover:cursor-pointer"
                    >
                        DESCARGAR INFORMACIÓN
                    </button>
                </div>

                <div className=" w-full px-4 -mx-4 sm:-mx-6 lg:-mx-8">
                    <div className="overflow-x-auto">
                        <IdeaTable data={ ideaList } />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Administrator