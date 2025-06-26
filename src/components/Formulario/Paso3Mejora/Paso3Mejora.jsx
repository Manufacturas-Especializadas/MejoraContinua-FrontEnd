
const Paso3Mejora = ({ formData, handleChange }) => {
    
    return (
        <>
            <div className="animate-fadeIn">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    ¿Cómo lo mejorarías?
                </label>
                <textarea
                    required
                    name="ideaMejora"
                    value={ formData.ideaMejora }
                    onChange={ handleChange }
                    rows={ 5 }
                    maxLength={ 255 }
                    placeholder="Describe tu idea..."
                    className="w-full border border-gray-300 
                    rounded-md shadow-sm py-2 px-3 focus:outline-none
                    focus:ring-indigo-500 focus:border-indigo-500"
                />
                <p className="mt-1 text-xs text-gray-500 text-right">
                    { formData.ideaMejora.length }/255
                </p>
            </div>
        </>
    )
}

export default Paso3Mejora