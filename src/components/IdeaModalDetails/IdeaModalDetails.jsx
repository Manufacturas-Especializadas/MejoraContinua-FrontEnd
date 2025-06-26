
const IdeaModalDetails = ({ idea, onClose }) => {
    if(!idea) return null;

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center
                justify-center bg-black opacity-95">
                <div className="bg-white rounded-lg shadow-lg w-full
                    max-w-lg p-6 relative animate-fadeIn">
                    <h2 className="text-xl font-bold mb-4">
                        Detalles de la solicitud
                    </h2>

                    <div className="space-y-3 text-sm">
                        <p><strong>Nombre: </strong>{ idea.fullName || "Sin nombre" }</p>
                        <p><strong>Área de trabajo: </strong>{ idea.workArea || "Sin área" }</p>
                        <p><strong>Situación actual: </strong>{ idea.currentSituation || "Sin descripción" }</p>
                        <p><strong>Idea: </strong>{ idea.ideaDescription || "Sin detalle" }</p>
                        <p><strong>Fecha de registro: </strong>{ new Date(idea.registrationDate).toLocaleDateString() }</p>
                        <p><strong>Estado: </strong>{ idea.status || "Sin estatus" }</p>
                        <p><strong>Champions: </strong>{ idea.championNames?.join(", ") || "Sin champions asignados" }</p>
                    </div>

                    <button
                        onClick={ onClose }
                        className="mt-6 px-4 py-2 
                        bg-indigo-600 text-white rounded
                        hover:bg-indigo-700 hover:cursor-pointer"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </>
    )
}

export default IdeaModalDetails