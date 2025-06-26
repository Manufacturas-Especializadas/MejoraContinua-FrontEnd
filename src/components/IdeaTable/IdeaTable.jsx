import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import IdeaModalDetails from "../IdeaModalDetails/IdeaModalDetails";

const IdeaTable = ({ data = [] }) => {
    const[filteredText, setFilteredText] = useState("");
    const[resetPaginationToggle, setResetPaginationToggle] = useState("");
    const[loading, setLoading] = useState(true);
    const[modalOpen, setModalOpen] = useState(false);
    const[selectedIdea, setSelectedIdea] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        if(data){
            setLoading(false);
        }
    },[data]);

    const handleNavigate = (path) => {
        navigate(path);
    };

    const openModal = (idea) => {
        setSelectedIdea(idea);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedIdea(null);
    };

    const filteredItems = useMemo(() => {
        if (!data || data.length === 0) return [];
    
        const searchText = filteredText.toLowerCase();
    
        return data.filter(item => {
            return Object.values(item).some(val => {
                return (
                    val !== null &&
                    val !== undefined &&
                    typeof val.toString === "function" &&
                    val.toString().toLowerCase().includes(searchText)
                );
            });
        });
    }, [data, filteredText]);

    const columns = [
        {
            name: "Nombre",
            selector: row => row.fullName || "Sin nombre",
            sortable: true,
        },
        {
            name: "Área de trabajo",
            selector: row => row.workArea,
            sortable: true,
            grow: 1
        },           
        {
            name: "Fecha de regisgtro",
            selector: row => new Date(row.registrationDate).toLocaleDateString(),
            sortable: true,
            grow: 1
        },
        {
            name: "Estado",
            selector: row => row.status,
            sortable: true,
            grow: 1
        },
        {
            name: "Acciones",
            cell: row => (
                <div className="flex space-x-2 justify-center">
                    <button
                        onClick={() => handleNavigate(`/administrador/editar/${row.id}`)}
                        className="text-sky-600 hover:text-sky-900 
                        hover:cursor-pointer font-medium"
                    >
                        Editar
                    </button>
                    <button 
                        onClick={() => openModal(row)}
                        className="text-blue-600 hover:text-blue-900
                        hover:cursor-pointer font-medium"
                    >
                        Detalles
                    </button>
                    <button
                        onClick={() => handleNavigate(`/administrador/asignarChampion/${row.id}`)}
                        className="text-violet-600 hover:text-violet-900
                        hover:cursor-pointer font-medium"
                    >
                        Asignar Champion
                    </button>                                    
                </div>
            ),
            ignoreRowClick: true,
        }
    ];

    const customStyles = {
        headCells: {
            style: {
                fontWeight: "600",
                fontSize: "14px",
                backgroundColor: "#F3F4F6",
                color: "#4B5563",
                textTransform: "uppercase",
                letterSpacing: "1px"
            },
        },
        rows: {
            style: {
                "&:hover": {
                    backgroundColor: "#BFDBFE !important"
                },
            },
        },
        pagination: {
            style: {
                borderTop: "none",
                justifyContent: "center"
            }
        }
    };

    return (
        <>
            <div className="w-full">
                <DataTable
                    columns={ columns }
                    data={ filteredItems }
                    pagination
                    paginationPerPage={ 10 }
                    paginationRowsPerPageOptions={[5, 10, 15]}
                    paginationComponentOptions={{
                        rowsPerPageText: "Filas por página:",
                        rangeSeparatorText: "de",
                        noRowsPerPage: false,
                    }}
                    highlightOnHover
                    responsive
                    striped
                    subHeader
                    subHeaderComponent={
                        filteredText && (
                            <button
                                onClick={() => {
                                    setResetPaginationToggle(!resetPaginationToggle)
                                    setFilteredText("");
                                }}
                                className="text-sm text-red-500 hover:text-red-700 underline"
                            >
                                Limpiar
                            </button>
                        )
                    }
                    subHeaderAlign="right"
                    customStyles={ customStyles }
                    progressComponent={
                        loading ? (
                            <div className="flex justify-center items-center h-20">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-indigo-600"></div>
                            </div>
                        ) : null
                    }
                    noDataComponent={<p className="py-4 text-gray-500">No se encontraron registros.</p>}
                />
            </div>

            {modalOpen && selectedIdea && (
                <IdeaModalDetails idea={ selectedIdea } onClose={ closeModal }/>
            )}
        </>
    )
}

export default IdeaTable