
const IdeaCard = ({ idea }) => {
    const{ fullName, workArea,  currentSituation, ideaDescription, status, championNames } = idea;

    return (
        <>
            <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-indigo-500">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div>
                <h2 className="text-xl font-semibold text-gray-800">
                    { fullName }
                </h2>
                <p className="text-gray-600 mt-2">
                    <strong>Situación:</strong> { currentSituation }
                </p>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    <strong>Idea:</strong> { ideaDescription }
                </p>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    <strong>Área:</strong> { workArea }
                </p>

                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    <strong>Champion(s) asignado(s): </strong> { championNames?.join(", ") || "Sin asignar champions" }
                </p>
                </div>

                <div className="flex flex-col items-start md:items-end space-y-2">
                <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium 
                    ${status === 'Enviada' ? 'bg-yellow-100 text-yellow-800' :
                        status === 'En proceso' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'}`}
                >
                    { status || 'Sin estado' }
                </span>
                    <span className="text-xs text-gray-500">
                        Registrado el: {new Date(idea.registrationDate).toLocaleDateString()}
                    </span>
                </div>
            </div>
            </div>
        </>
    )
}

export default IdeaCard