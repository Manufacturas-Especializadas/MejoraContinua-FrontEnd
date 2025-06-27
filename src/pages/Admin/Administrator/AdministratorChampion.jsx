import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import config from "../../../../config";
import Swal from "sweetalert2";

const AdministratorChampion = () => {
    const[formData, setFormData] = useState({
        fullName: "",
        currentSituation: "",
        ideaDescription: "",
        champions: [""]
    });
    const[championList, setChampionList] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getChampionList = async() => {
            try{
                const response = await fetch(`${config.apiUrl}/ContinuousImprovementForm/GetListChampions`);

                if(!response.ok){
                    throw new Error("Error al obtner los daots");
                }

                const data = await response.json();
                setChampionList(data);
            }catch(error){
                console.error("Error: ", error.message);
            }
        }
        getChampionList();
    }, []);

    useEffect(() => {
        const getIdeaById = async() => {
            try{
                const response = await fetch(`${config.apiUrl}/ContinuousImprovementForm/GetIdeaById?id=${id}`);

                if(!response.ok){
                    throw new Error("Error al obtener los datos");                 
                }

                const data = await response.json();

                if(data && data){
                    const idea = data;

                    setFormData({
                        id: idea.id ?? "",
                        fullName: idea.fullName ?? "",
                        currentSituation: idea.currentSituation ?? "",
                        ideaDescription: idea.ideaDescription ?? "",
                        champions: idea.champion ? [idea.champion] : [""]
                    });
                }
            }catch(error){
                console.error("Error: ", error);
                Swal.fire({
                    icon: "error",
                    title: "Ooops...",
                    text: "No se pudo cargar el proyecto"
                });
            }
        }

        if(id) getIdeaById();
    }, [id]);

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value === "" ? "" : isNaN(value) ? value : parseInt(value)
        }));
    };
    
    const handleChangeChampion = (e, index) => {
        const { value } = e.target;
        setFormData(prev => {
            const updatedChampions = [...prev.champions];
            updatedChampions[index] = value;
            return { ...prev, champions: updatedChampions };
        });
    };

    const handleAddChampion = () => {
        setFormData(prev => ({
            ...prev,
            champions: [...prev.champions, ""]
        }));
    };

    const handleRemoveChampion = (index) => {
        setFormData(prev => ({
            ...prev,
            champions: prev.champions.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async () => {
        const validChampions = formData.champions.filter(id => id !== "");
    
        if (validChampions.length === 0) {
            Swal.fire({
                icon: "error",
                text: "Selecciona al menos un champion"
            });
            return;
        }
    
        const payload = validChampions.map(championId => ({
            IdeaId: parseInt(id),
            ChampionId: parseInt(championId)
        }));
    
        try {
            const response = await fetch(`${config.apiUrl}/ContinuousImprovementForm/AssignChampionsToIdea`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
    
            if (!response.ok) {
                throw new Error("Error al asignar el champion");
            }
    
            Swal.fire({
                icon: "success",
                title: "Champion asignado correctamente"
            }).then(() => {
                navigate("/administrador");
            });
        } catch (error) {
            console.error("Error: ", error.message);
            Swal.fire({
                icon: "error",
                title: "No se pudo asignar al champion"
            });
        }
    };

    return (
        <>
            <div className="max-w-2xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-center mb-6">
                    ASIGNAR IDEA A UN CHAMPION
                </h1>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre(s) Completo
                        </label>
                        <input
                            disabled
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Situación actual
                        </label>
                        <textarea
                            disabled
                            name="currentSituation"
                            value={ formData.currentSituation }
                            onChange={ handleChange }
                            rows={ 5 }
                            className="w-full border border-gray-300 
                            rounded-md shadow-sm py-2 px-3 focus:outline-none
                            focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Mejora
                        </label>
                        <textarea
                            disabled
                            name="ideaDescription"
                            value={ formData.ideaDescription }
                            onChange={ handleChange }
                            rows={ 5 }
                            className="w-full border border-gray-300 
                            rounded-md shadow-sm py-2 px-3 focus:outline-none
                            focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <hr className="border-t border-gray-300 my-4"/>
                    <h2 className="text-center text-gray-700">
                        Elige a un champion
                    </h2>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Nombre del champion
                        </label>
                        <div className="space-y-4">
                            {
                                formData.champions.map((championId, index) => (
                                    <div key={ index } className="flex items-center space-x-2">
                                        <select
                                            required
                                            name="champion"
                                            value={ championId }
                                            onChange={(e) => handleChangeChampion(e, index)}
                                            className="block w-full border border-gray-300
                                            rounded-md shadow-md py-2 px-3 focus:outline-none
                                            focus:ring-indigo-500 focus:border-indigo-500"
                                        >
                                            <option value="">Selecciona un champion</option>
                                            {
                                                championList.map((champion) => (
                                                    <option key={ champion.id } value={ champion.id }>
                                                        { champion.name }
                                                    </option>
                                                ))
                                            }
                                        </select>

                                        {
                                            formData.champions.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveChampion(index)}
                                                    className="text-red-600 hover:text-red-800
                                                    focus:outline-none text-sm hover:cursor-pointer"
                                                >
                                                    × Eliminar
                                                </button>
                                            )
                                        }
                                    </div>
                                ))
                            }

                            <button
                                type="button"
                                onClick={ handleAddChampion }
                                className="text-indigo-600 hover:text-indigo-800 
                                text-sm font-medium hover:cursor-pointer"
                            >
                                + Agregar otro champion
                            </button>
                        </div>
                    </div>

                    <div className="flex space-x-4 pt-4">
                        <button
                            onClick={ handleSubmit }
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700
                            text-white font-medium rounded-md hover:cursor-pointer"
                        >
                            Asignar
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
                </div>
            </div>
        </>
    )
}

export default AdministratorChampion