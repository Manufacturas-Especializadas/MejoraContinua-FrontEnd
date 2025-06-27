import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import config from "../../../../config";
import Swal from "sweetalert2";

const AdministratorFormEdit = () => {
    const[formData, setFormData] = useState({
        id: "",
        fullName: "",
        workArea: "",
        currentSituation: "",
        ideaDescription: "",
        registrationDate: "",
        statusId: 1,
    });
    const[status, setStatus] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getListStatus = async() => {
            try{
                const response = await fetch(`${config.apiUrl}/ContinuousImprovementForm/GetListStatus`);

                if(!response.ok){
                    throw new Error("Error al obtener los datos");
                }

                const data = await response.json();
                setStatus(data);
            }catch(error){
                console.error("Error al hacer fetching: ",error);
            }
        }

        getListStatus();
    }, []);

    useEffect(() => {
        const getIdeaById = async() => {
            try {
            const response = await fetch(`${config.apiUrl}/ContinuousImprovementForm/GetIdeaById?id=${id}`);
            if (!response.ok) {
                throw new Error("Error al obtener los datos");
            }
        
            const data = await response.json();
            console.log("Datos recibidos del backend:", data);
        
            if (data) {
                setFormData({
                    id: data.id ?? "",
                    fullName: data.fullName ?? "",
                    workArea: data.workArea ?? "",
                    currentSituation: data.currentSituation ?? "",
                    ideaDescription: data.ideaDescription ?? "",
                    statusId: data.statusId ?? 1,
                    registrationDate: data.registrationDate?.split("T")[0] ?? "",
                });
            }
        
            } catch (error) {
            console.error("Error: ", error);
            Swal.fire({
                icon: "error",
                title: "Ooops...",
                text: "No se pudo cargar el proyecto"
            });
            }
        };
        
        if (id) getIdeaById();
    }, [id]);

    const handleSubmit = async() => {
        const {fullName, workArea, currentSituation, ideaDescription, statusId} = formData;

        try{
            const response = await fetch(`${config.apiUrl}/ContinuousImprovementForm/Update/${formData.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",            
                },
                body: JSON.stringify({ fullName, workArea, currentSituation, ideaDescription, statusId })
            });

            if(!response.ok){
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Error ${response.status}`);
            };

            Swal.fire({
                icon: "success",
                title: "Acutalizado correctamente",                
            });

            setTimeout(() => {
                handleNavigate("/administrador");
            }, 1000);
        }catch(error){
            console.error("Error al actualizar: ", error.message);
            Swal.fire({
                icon: "error",
                title: "Ooops...",
                text: `No se pudo actualizar: ${error.message}`
            });
        }
    }

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleChange = (e) =>{
        const{name, value} = e.target;
        setFormData((prev) =>({
            ...prev,
            [name]: value
        }));
    };

    return (
        <>
            <div className="max-w-2xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-center mb-6">
                    SOLICITUD
                </h1>

                <form className="space-y-6"  onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Nombre(s) Completo
                        </label>
                        <input
                            required
                            type="text"
                            name="fullName"
                            value={ formData.fullName }
                            onChange={ handleChange }
                            className="mt-1 block w-full border border-gray-300 
                            rounded-md shadow-md py-2 px-3 focus:outline-none
                            focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Área de trabajo
                        </label>
                        <input
                            required
                            type="text"
                            name="workArea"
                            value={ formData.workArea }
                            onChange={ handleChange }
                            className="mt-1 block w-full border border-gray-300 
                            rounded-md shadow-md py-2 px-3 focus:outline-none
                            focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Fecha de registro
                        </label>
                        <input
                            type="date"
                            name="registrationDate"
                            value={ formData.registrationDate }
                            readOnly
                            className="mt-1 block w-full border border-gray-300 bg-gray-50
                            rounded-md shadow-md py-2 px-3 focus:outline-none
                            focus:ring-indigo-500 focus:border-indigo-500 cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Estado
                        </label>
                        <select
                            name="statusId"
                            value={ formData.statusId }
                            onChange={ handleChange }
                            className="mt-1 block w-full border border-gray-300 
                            rounded-md shadow-md py-2 px-3 focus:outline-none
                            focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            {
                                status.map((item, index) => (
                                    <option key={ index} value={ item.id }>
                                        { item.name }
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Situación actual
                        </label>
                        <textarea
                            required
                            name="currentSituation"
                            value={ formData.currentSituation }
                            onChange={ handleChange }
                            rows={ 5 }
                            placeholder="Describe tu idea..."
                            className="w-full border border-gray-300 
                            rounded-md shadow-sm py-2 px-3 focus:outline-none
                            focus:ring-indigo-500 focus:border-indigo-500"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Mejora
                        </label>
                        <textarea
                            required
                            type="text"
                            name="ideaDescription"
                            value={ formData.ideaDescription }
                            onChange={ handleChange }
                            rows={ 5 }
                            className="mt-1 block w-full border border-gray-300 
                            rounded-md shadow-md py-2 px-3 focus:outline-none
                            focus:ring-indigo-500 focus:border-indigo-500"
                        ></textarea>
                    </div>

                    <div className="flex space-x-4 pt-4">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700
                            text-white font-medium rounded-md hover:cursor-pointer"
                        >
                            Guardar cambios
                        </button>
                        <button
                            type="button"
                            onClick={() => handleNavigate("/administrador")}
                            className="px-4 py-2 bg-gray-600 hover:bg-gray-700
                            text-white font-medium rounded-md hover:cursor-pointer"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AdministratorFormEdit