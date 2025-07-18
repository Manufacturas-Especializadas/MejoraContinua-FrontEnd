import { useState } from "react";
import ProgresoBarra from "../../components/Formulario/ProgresoBarra/ProgresoBarra";
import Paso1Datos from "../../components/Formulario/Paso1Datos/Paso1Datos";
import Paso2Categoria from "../../components/Formulario/Paso2Categoria/Paso2Categoria";
import Paso3Mejora from "../../components/Formulario/Paso3Mejora/Paso3Mejora";
import config from "../../../config";
import Swal from "sweetalert2";
import logo from "../../assets/logoNuevo.jpg";

const MejoraForm = () => {
    const[step, setStep] = useState(1);
    const[formData, setFormData] = useState({
        nombre: [""],
        area: "",
        descripcionProblema: "",
        categoryIds: [],
        ideaMejora: ""
    });
    const[error, setError] = useState("");
    const[loading, setLoading] = useState(false);

    const handleChange = (e, index) => {
        const { name, value } = e.target;

        if (name === 'nombre') {
            const updatedNames = [...formData.nombre];
            updatedNames[index] = value;
            setFormData((prev) => ({ ...prev, [name]: updatedNames }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleCategorySelect = (categoryIds) => {
        setFormData((prev) => ({ ...prev, categoryIds }));
    };

    const validateStep = () => {
        let isValid = true;

        if(step === 1){
            if(!formData.area || !formData.descripcionProblema || formData.nombre.some(n => n.trim() === "")){
                setError("Por favor, completa todos los campos obligatorios");
                isValid = false;
            }
        };

        if(step === 2 && (!formData.categoryIds || formData.categoryIds.length === 0)){
            setError("Por favor, selecciona una categoría");
            isValid = false;
        };

        if(step === 3 && !formData.ideaMejora){
            setError("La descripción de la idea es obligatoría");
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async () => {
        if (!validateStep()) return;

        setError("");

        const loadingAler = Swal.fire({
            title: "Enviando...",
            text: "Por favor espere mientras se envía",
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            const response = await fetch(`${config.apiUrl}/ContinuousImprovementForm/Register`,  {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fullName: formData.nombre.filter(n => n.trim() !== "").join(", "),
                    workArea: formData.area,
                    currentSituation: formData.descripcionProblema,
                    ideaDescription: formData.ideaMejora,
                    categoryIds: formData.categoryIds || []
                }),
            });

            const result = await response.json();
            
            Swal.close();

            if (!response.ok) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: result.message || "Error al enviar la idea"
                });
                return;
            }

            Swal.fire({
                title: "¡Gracias por tu idea!",
                icon: "success",
            });

            setStep(1);
            setFormData({
                nombre: [""],
                area: "",
                descripcionProblema: "",
                categoryIds: [],
                ideaMejora: ""
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error de conexión",
                text: "No se pudo conectar con el servidor"
            });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const nextStep = () => {
        if(!validateStep()) return;
        setStep(step + 1);        
    };

    const prevStep = () => setStep(step - 1);

    return (
        <>
            <div className="bg-white shadow rounded-lg p-6 max-w-2xl mx-auto w-full
                bg-gradient-to-br from-indigo-50 to-blue-50 px-4">
                <div className="bg-white shadow-xl rounded-lg p-6 md:p-8 w-full max-w-2xl
                    transition-all duration-300 transform">
                    <ProgresoBarra step={ step }/>

                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        { step === 1 && <img src={logo} alt="Logo" className="h-30 mx-auto" /> }
                        { step === 2 && 'Selecciona una categoria' }
                        { step === 3 && 'Tu idea de mejora' }
                    </h2>

                    { error && <div className="mb-4 text-red-600 text-sm">{ error }</div> }

                    { step === 1 && <Paso1Datos formData={ formData } setFormData={ setFormData }  handleChange={ handleChange }/> }

                    { step === 2 && <Paso2Categoria formData={ formData } handleCategorySelect={ handleCategorySelect }/> }

                    { step === 3 && <Paso3Mejora formData={ formData } handleChange={ handleChange }/> }

                    <div className="mt-8 flex justify-between">
                        {
                            step > 1 && (
                                <button
                                    type="button"
                                    onClick={ prevStep }
                                    className="ml-auto px-4 py-2 border border-gray-300 rounded-md 
                                    text-gray-700 hover:bg-gray-200 transition hover:cursor-pointer"
                                >
                                    Atrás
                                </button>
                            )
                        }
                        {
                            step < 3 ? (
                                <button
                                    type="button"
                                    onClick={ nextStep }
                                    className="ml-auto px-4 py-2 bg-green-600 text-white 
                                    rounded-md hover:bg-green-700 transition hover:cursor-pointer"
                                >
                                    Siguiente
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={ handleSubmit }
                                    className="ml-auto px-4 py-2 bg-green-600 text-white 
                                    rounded-md hover:bg-green-700 transition hover:cursor-pointer"
                                    disabled={ loading }
                                >
                                    Enviar
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default MejoraForm