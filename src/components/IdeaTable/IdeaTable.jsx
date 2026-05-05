import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import IdeaModalDetails from "../IdeaModalDetails/IdeaModalDetails";
import {
  HiOutlinePencilAlt,
  HiOutlineEye,
  HiOutlineUserAdd,
  HiChevronLeft,
  HiChevronRight,
  HiOutlineTrash,
} from "react-icons/hi";
import { useDeleteIdea } from "../../hooks/useDeleteIdea";
import { DeleteConfirmationModal } from "../DeleteConfirmationModal/DeleteConfirmationModal";

const IdeaTable = ({ data = [], searchTerm = "", onRefresh }) => {
  const [filteredText, setFilteredText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const { deleteIdea, isDeleting } = useDeleteIdea();
  const [deleteModal, setDeleteModal] = useState({ open: false, idea: null });

  const itemsPerPage = 10;

  const navigate = useNavigate();

  useEffect(() => {
    setFilteredText(searchTerm);
    setCurrentPage(1);
  }, [searchTerm]);

  const openModal = (idea) => {
    setSelectedIdea(idea);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedIdea(null);
  };

  const handleDelete = async () => {
    const result = await deleteIdea(deleteModal.idea.id);

    if (result.success) {
      setDeleteModal({ open: false, idea: null });
      if (onRefresh) onRefresh();
    }
  };

  const filteredItems = useMemo(() => {
    const searchText = filteredText.toLowerCase();
    return data.filter(
      (item) =>
        item.fullName?.toLowerCase().includes(searchText) ||
        Object.values(item).some((val) =>
          val?.toString().toLowerCase().includes(searchText),
        ),
    );
  }, [data, filteredText]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const getStatusStyle = (status) => {
    const styles = {
      Enviada: "bg-blue-50 text-blue-700 border-blue-100",
      "En proceso": "bg-amber-50 text-amber-700 border-amber-100",
      "No aprobada": "bg-red-50 text-red-700 border-red-100",
      Implementada: "bg-emerald-50 text-emerald-700 border-emerald-100",
    };
    return styles[status] || "bg-gray-50 text-gray-700 border-gray-100";
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/50">
              <th
                className="px-6 py-4 text-xs font-bold text-slate-500 uppercase 
								tracking-wider"
              >
                Nombre
              </th>
              <th
                className="px-6 py-4 text-xs font-bold text-slate-500 uppercase 
								tracking-wider"
              >
                Área
              </th>
              <th
                className="px-6 py-4 text-xs font-bold text-slate-500 uppercase 
								tracking-wider"
              >
                Fecha
              </th>
              <th
                className="px-6 py-4 text-xs font-bold text-slate-500 uppercase 
								tracking-wider"
              >
                Estado
              </th>
              <th
                className="px-6 py-4 text-xs font-bold text-slate-500 uppercase 
								tracking-wider text-center"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {currentItems.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-slate-50/80 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-900">
                    {row.fullName || "Sin nombre"}
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600 text-sm">
                  {row.workArea}
                </td>
                <td className="px-6 py-4 text-slate-500 text-sm">
                  {new Date(row.registrationDate).toLocaleDateString("es-MX", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(row.status)}`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-1">
                    <button
                      title="Editar Idea"
                      onClick={() =>
                        navigate(`/administrador/editar/${row.id}`)
                      }
                      className="p-2 text-slate-400 hover:text-indigo-600 
											hover:bg-indigo-50 rounded-lg transition-all"
                    >
                      <HiOutlinePencilAlt className="w-5 h-5" />
                    </button>
                    <button
                      title="Ver Detalles"
                      onClick={() => openModal(row)}
                      className="p-2 text-slate-400 hover:text-blue-600 
											hover:bg-blue-50 rounded-lg transition-all"
                    >
                      <HiOutlineEye className="w-5 h-5" />
                    </button>
                    <button
                      title="Asignar Champion"
                      onClick={() =>
                        navigate(`/administrador/asignarChampion/${row.id}`)
                      }
                      className="p-2 text-slate-400 hover:text-violet-600 
											hover:bg-violet-50 rounded-lg transition-all"
                    >
                      <HiOutlineUserAdd className="w-5 h-5" />
                    </button>
                    <button
                      title="Eliminar Idea"
                      onClick={() => setDeleteModal({ open: true, idea: row })}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 
											rounded-lg transition-all"
                    >
                      <HiOutlineTrash className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredItems.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-400 font-medium">
              No se encontraron registros.
            </p>
          </div>
        )}
      </div>

      {filteredItems.length > 0 && (
        <div
          className="px-6 py-4 bg-slate-50/50 border-t border-slate-200 
					flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <div className="text-sm text-slate-500">
            Mostrando{" "}
            <span className="font-semibold text-slate-700">
              {indexOfFirstItem + 1}
            </span>{" "}
            a{" "}
            <span className="font-semibold text-slate-700">
              {Math.min(indexOfLastItem, filteredItems.length)}
            </span>{" "}
            de{" "}
            <span className="font-semibold text-slate-700">
              {filteredItems.length}
            </span>{" "}
            ideas
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-slate-200 bg-white 
							text-slate-600 hover:bg-slate-50 disabled:opacity-50 
							disabled:cursor-not-allowed transition-all"
            >
              <HiChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                if (
                  totalPages > 5 &&
                  Math.abs(pageNum - currentPage) > 1 &&
                  pageNum !== 1 &&
                  pageNum !== totalPages
                ) {
                  if (pageNum === 2 || pageNum === totalPages - 1)
                    return (
                      <span key={pageNum} className="px-2 text-slate-400">
                        ...
                      </span>
                    );
                  return null;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                      currentPage === pageNum
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-slate-200 bg-white 
							text-slate-600 hover:bg-slate-50 disabled:opacity-50 
							disabled:cursor-not-allowed transition-all"
            >
              <HiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {modalOpen && selectedIdea && (
        <IdeaModalDetails idea={selectedIdea} onClose={closeModal} />
      )}

      <DeleteConfirmationModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, idea: null })}
        onConfirm={handleDelete}
        itemName={deleteModal.idea?.fullName}
        isLoading={isDeleting}
      />
    </>
  );
};

export default IdeaTable;
