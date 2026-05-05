import { HiOutlineExclamation, HiOutlineTrash } from "react-icons/hi";

export const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  isLoading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={!isLoading ? onClose : null}
      />

      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden
        transform transition-all animate-in fade-in zoom-in duration-200"
      >
        <div className="p-6">
          <div className="flex items-center gap-4">
            <div
              className="shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center 
              justify-center text-red-600"
            >
              <HiOutlineExclamation className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Confirmar eliminación
              </h3>
              <p className="text-slate-500 text-sm mt-1">
                Esta acción no se puede deshacer
              </p>
            </div>
          </div>

          <div className="mt-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <p>
              ¿Estás seguro de que deseas eliminar la idea de: <br />
              <span className="font-bold text-slate-800">{itemName}</span>
            </p>
          </div>
        </div>

        <div className="bg-slate-50 px-6 py-4 flex flex-col sm:flex-row-reverse gap-3">
          <button
            disabled={isLoading}
            onClick={onConfirm}
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 
            text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm hover:shadow-md
            disabled:opacity-50"
          >
            {isLoading ? (
              <div
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full
                animate-spin"
              />
            ) : (
              <HiOutlineTrash className="w-5 h-5" />
            )}
            {isLoading ? "Eliminando" : "Sí, eliminar idea"}
          </button>
          <button
            disabled={isLoading}
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl font-semibold text-slate-600 hover:bg-slate-200
            transition-all disabled:opacity-50 hover:cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
