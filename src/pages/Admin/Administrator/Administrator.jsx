import IdeaTable from "../../../components/IdeaTable/IdeaTable";
import { useIdeas } from "../../../hooks/useIdeas";
import { useExportIdeas } from "../../../hooks/useExportIdeas";
import { useMemo, useState } from "react";
import {
  HiOutlineDownload,
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlineTrash,
} from "react-icons/hi";

const months = [
  { value: 0, label: "Todo el año" },
  { value: 1, label: "Enero" },
  { value: 2, label: "Febrero" },
  { value: 3, label: "Marzo" },
  { value: 4, label: "Abril" },
  { value: 5, label: "Mayo" },
  { value: 6, label: "Junio" },
  { value: 7, label: "Julio" },
  { value: 8, label: "Agosto" },
  { value: 9, label: "Septiembre" },
  { value: 10, label: "Octubre" },
  { value: 11, label: "Noviembre" },
  { value: 12, label: "Diciembre" },
];

const Administrator = () => {
  const { ideaList, filteredIdeas, loading, error, filters, actions } =
    useIdeas();
  const { downloading, exportExcel } = useExportIdeas();
  const [yearToExport, setYearToExport] = useState(new Date().getFullYear());
  const [monthToExport, setMonthToExport] = useState(0);

  const availableYears = useMemo(() => {
    const years = new Set([new Date().getFullYear(), yearToExport]);
    ideaList.forEach((idea) => {
      if (idea.registrationDate) {
        years.add(new Date(idea.registrationDate).getFullYear());
      }
    });
    return Array.from(years).sort((a, b) => b - a);
  }, [ideaList, yearToExport]);

  const statusOptions = [
    { value: "", label: "Todos los estatus" },
    { value: "Enviada", label: "Enviada" },
    { value: "En proceso", label: "En proceso" },
    { value: "No aprobada", label: "No aprobada" },
    { value: "Implementada", label: "Implementada" },
  ];

  return (
    <div className=" bg-slate-50/50 pb-12">
      <div className="bg-white border-b border-slate-200 mb-8">
        <div
          className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col 
          md:flex-row justify-between items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Panel de Administración
            </h1>
            <p className="text-slate-500 mt-1">
              Gestiona, filtra y exporta las propuestas de mejora continua.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <select
              value={yearToExport}
              onChange={(e) => setYearToExport(Number(e.target.value))}
              className="bg-white border border-slate-300 text-slate-700 text-sm 
              rounded-lg p-2.5"
            >
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  Año {year}
                </option>
              ))}
            </select>

            <select
              value={monthToExport}
              onChange={(e) => setMonthToExport(Number(e.target.value))}
              className="bg-white border border-slate-300 text-slate-700 text-sm 
              rounded-lg p-2.5"
            >
              {months.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>

            <button
              disabled={loading || downloading}
              onClick={() => exportExcel(yearToExport, monthToExport)}
              className="flex items-center justify-center gap-2 bg-indigo-600 
              hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-semibold 
              transition-all shadow-sm"
            >
              <HiOutlineDownload className="w-5 h-5" />
              {downloading ? "Procesando..." : "Exportar Excel"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-6">
              <label
                className="block text-xs font-bold text-slate-500 uppercase 
                tracking-wider mb-2"
              >
                Búsqueda Inteligente
              </label>
              <div className="relative">
                <HiOutlineSearch
                  className="absolute left-3 top-1/2 -translate-y-1/2 
                  text-slate-400 w-5 h-5"
                />
                <input
                  type="text"
                  placeholder="Buscar por nombre, área o descripción..."
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 
                  rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-slate-700"
                  value={filters.searchTerm}
                  onChange={(e) => filters.setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="lg:col-span-4">
              <label
                className="block text-xs font-bold text-slate-500 uppercase 
                tracking-wider mb-2"
              >
                Filtrar por Estatus
              </label>
              <div className="relative">
                <HiOutlineFilter
                  className="absolute left-3 top-1/2 -translate-y-1/2 
                  text-slate-400 w-5 h-5"
                />
                <select
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 
                  rounded-xl appearance-none focus:ring-2 focus:ring-indigo-500/20 
                  focus:border-indigo-500 transition-all outline-none text-slate-700"
                  value={filters.selectedStatus}
                  onChange={(e) => filters.setSelectedStatus(e.target.value)}
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="lg:col-span-2">
              <button
                onClick={actions.clearFilters}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 
                border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 
                hover:text-red-600 hover:border-red-200 transition-all font-medium"
              >
                <HiOutlineTrash className="w-5 h-5" />
                Limpiar
              </button>
            </div>
          </div>

          {(filters.searchTerm || filters.selectedStatus) && (
            <div
              className="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t 
              border-slate-100"
            >
              <span className="text-sm font-medium text-slate-400">
                Activos:
              </span>
              {filters.searchTerm && (
                <span
                  className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 
                  text-indigo-700 rounded-full text-xs font-bold"
                >
                  "{filters.searchTerm}"
                  <button
                    onClick={() => filters.setSearchTerm("")}
                    className="hover:text-indigo-900"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.selectedStatus && (
                <span
                  className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 
                  text-emerald-700 rounded-full text-xs font-bold"
                >
                  {filters.selectedStatus}
                  <button
                    onClick={() => filters.setSelectedStatus("")}
                    className="hover:text-emerald-900"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        <div
          className="bg-white rounded-2xl shadow-sm border border-slate-200 
          overflow-hidden"
        >
          <div
            className="p-4 border-b border-slate-100 flex justify-between 
            items-center bg-slate-50/30"
          >
            <span className="text-sm font-medium text-slate-500">
              Mostrando{" "}
              <span className="text-slate-900 font-bold">
                {filteredIdeas.length}
              </span>{" "}
              resultados
            </span>
          </div>

          {loading ? (
            <div className="py-24 text-center">
              <div
                className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 
                border-indigo-600 mx-auto"
              ></div>
              <p className="mt-4 text-slate-500 font-medium">
                Sincronizando información...
              </p>
            </div>
          ) : error ? (
            <div className="py-24 text-center">
              <div
                className="bg-red-50 text-red-600 p-4 rounded-full w-16 h-16 
                flex items-center justify-center mx-auto mb-4"
              >
                ⚠️
              </div>
              <p className="text-slate-800 font-bold mb-4">{error}</p>
              <button
                onClick={actions.refresh}
                className="bg-slate-900 text-white px-6 py-2 rounded-lg 
                hover:bg-slate-800 transition-all"
              >
                Intentar de nuevo
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <IdeaTable
                data={filteredIdeas}
                searchTerm={filters.searchTerm}
                onSearchChange={filters.setSearchTerm}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Administrator;
