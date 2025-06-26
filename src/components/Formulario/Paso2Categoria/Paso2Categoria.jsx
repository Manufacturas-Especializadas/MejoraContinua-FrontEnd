import { FaHardHat, FaTools, FaTruck } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";

const categorias = [
    { id: 1, label: "Seguridad", icon: <FaHardHat size={30} /> },
    { id: 2, label: "Calidad", icon: <FaMagnifyingGlass size={30} /> },
    { id: 3, label: "Productividad", icon: <FaTools size={30} /> },
    { id: 4, label: "Entregas a tiempo", icon: <FaTruck size={30} /> }
];

const Paso2Categoria = ({ formData, handleCategorySelect }) => {
    const selectedCategories = formData.categoryIds || [];

    const isSelected = (id) => selectedCategories.includes(id);

    const toggleCategory = (id) => {
        if (isSelected(id)) {
            handleCategorySelect(selectedCategories.filter(catId => catId !== id));
        } else {
            handleCategorySelect([...selectedCategories, id]);
        }
    };

    return (
        <>
            <div className="space-y-6">
                {selectedCategories.length > 0 && (
                    <div className="text-center text-sm text-gray-600">
                        Seleccionaste{' '}
                    <span className="font-semibold">{ selectedCategories.length }</span>{' '}
                        { selectedCategories.length === 1 ? 'categoría' : 'categorías' }
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-slideIn">
                    {categorias.map((cat) => (
                        <button
                            key={ cat.id }
                            type="button"
                            onClick={() => toggleCategory(cat.id)}
                            className={`py-6 px-4 rounded-lg border-2 
                                flex flex-col items-center justify-center text-center 
                                transition-all duration-300 transform hover:scale-105 hover:cursor-pointer ${
                                isSelected(cat.id)
                                ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-300 ring-opacity-50'
                                : 'border-gray-300 hover:border-indigo-400'
                            }`}
                        >
                            <div className="text-indigo-600 mb-3">
                                { cat.icon }
                            </div>
                            <span className="text-sm font-medium">
                                { cat.label }
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Paso2Categoria