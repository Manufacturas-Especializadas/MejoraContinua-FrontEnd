const IdeaCard = ({ idea }) => {
    const { fullName, workArea, currentSituation, ideaDescription, status, championNames, year } = idea;

    const getStatusColor = (status) => {
        switch (status) {
            case 'Enviada': return { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' };
            case 'En proceso': return { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' };
            case 'No aprobada': return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' };
            case 'Implementada': return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' };
            default: return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300' };
        }
    };

    const statusColors = getStatusColor(status);

    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 overflow-hidden h-full flex flex-col">
            <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex justify-between items-start gap-2">
                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-800 text-lg line-clamp-2 leading-tight">
                            {fullName}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1 truncate">
                            {workArea}
                        </p>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full whitespace-nowrap flex-shrink-0">
                        {year}
                    </span>
                </div>
            </div>

            <div className="px-6 py-4 flex-grow">
                <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Situación actual</h4>
                    <p className="text-gray-600 text-sm line-clamp-3">{currentSituation}</p>
                </div>

                <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Propuesta de mejora</h4>
                    <p className="text-gray-600 text-sm line-clamp-3">{ideaDescription}</p>
                </div>

                <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Champions</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                        {championNames && championNames.length > 0 ? (
                            championNames.map((champion, index) => (
                                <span
                                    key={index}
                                    className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
                                >
                                    {champion}
                                </span>
                            ))
                        ) : (
                            <span className="text-sm text-gray-500 italic">No asignados</span>
                        )}
                    </div>
                </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 mt-auto">
                <div className="flex items-center justify-between">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors.bg} ${statusColors.text} ${statusColors.border}`}>
                        {status || 'Sin estado'}
                    </div>
                    <span className="text-xs text-gray-500">
                        {new Date(idea.registrationDate).toLocaleDateString('es-ES', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                        })}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default IdeaCard;