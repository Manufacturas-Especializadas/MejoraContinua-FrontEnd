
const Paso1Datos = ({ formData, setFormData, handleChange }) => {

    const handleAddName = () => {
        setFormData((prev) => ({
            ...prev,
            nombre: [...prev.nombre, ''],
        }));
    };

    const handleRemoveName = (index) => {
        const updatedNames = formData.nombre.filter((_, i) => i !== index);
        setFormData((prev) => ({
            ...prev,
            nombre: updatedNames,
        }));
    };

    return (
        <>
            <div className="space-y-4 animate-fadeIn">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre(s) completo(s)</label>

                    {formData.nombre.map((nombre, index) => (
                        <div key={index} className="flex items-center space-x-2 mt-2">
                            <input
                                required
                                type="text"
                                name="nombre"
                                value={nombre}
                                onChange={(e) => handleChange(e, index)}
                                className="block w-full border border-gray-300 rounded-md 
                                shadow-md py-2 px-3 focus:outline-none 
                                focus:ring-indigo-500 focus:border-indigo-500"
                            />

                            {index > 0 && (
                                <button
                                    type="button"
                                    onClick={() => handleRemoveName(index)}
                                    className="text-red-600 hover:text-red-800 
                                    focus:outline-none text-sm hover:cursor-pointer"
                                >
                                    × Eliminar
                                </button>
                            )}
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={handleAddName}
                        className="mt-2 text-sm text-indigo-600 
                        hover:text-indigo-800 focus:outline-none
                        hover:cursor-pointer"
                    >
                        + Agregar otro integrante
                    </button>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Área de implementación
                    </label>
                    <input
                        required
                        type="text"
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 
                        rounded-md shadow-md py-2 px-3 focus:outline-none
                        focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Situación actual
                    </label>
                    <textarea
                        required
                        type="text"
                        name="descripcionProblema"
                        value={formData.descripcionProblema}
                        onChange={handleChange}
                        maxLength={255}
                        className="w-full border border-gray-300 
                        rounded-md shadow-sm py-2 px-3 focus:outline-none
                        focus:ring-indigo-500 focus:border-indigo-500"
                    />

                    <p className="mt-1 text-xs text-gray-500 text-right">
                        {formData.descripcionProblema.length}/255
                    </p>
                </div>
            </div>
        </>
    )
}

export default Paso1Datos