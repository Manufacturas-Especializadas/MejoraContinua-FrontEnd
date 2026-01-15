import IdeaTable from "../../../components/IdeaTable/IdeaTable";
import { useIdeas } from "../../../hooks/useIdeas";
import { useExportIdeas } from "../../../hooks/useExportIdeas";
import { useMemo, useState } from "react";

const Administrator = () => {
  const { ideaList, filteredIdeas, loading, error, filters, actions } =
    useIdeas();

  const { downloading, exportExcel } = useExportIdeas();

  const [yearToExport, setYearToExport] = useState(new Date().getFullYear());

  const availableYears = useMemo(() => {
    const years = new Set();

    years.add(new Date().getFullYear());
    years.add(yearToExport);

    ideaList.forEach((idea) => {
      if (idea.registrationDate) {
        const year = new Date(idea.registrationDate).getFullYear();
        years.add(year);
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
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Administra las ideas registradas
          </h1>

          <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0 md:w-auto">
            <select
              value={yearToExport}
              onChange={(e) => setYearToExport(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none
              focus:right-2 focus:ring-primary focus:border-primary bg-white text-gray-700"
            >
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  Año {year}
                </option>
              ))}
            </select>

            <button
              className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-md transition-colors hover:cursor-pointer disabled:opacity-50"
              disabled={loading || downloading}
              onClick={() => exportExcel(yearToExport)}
            >
              {downloading ? "Descargando..." : "Descargar información"}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-4 md:space-y-0">
            <div className="flex-1">
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Buscar ideas
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  placeholder="Buscar por nombre, área, situación o descripción..."
                  className="w-full p-3 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  value={filters.searchTerm}
                  onChange={(e) => filters.setSearchTerm(e.target.value)}
                />
                <span className="absolute left-3 top-3 text-gray-400">🔍</span>
              </div>
            </div>

            <div className="md:w-64">
              <label
                htmlFor="statusFilter"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Filtrar por estatus
              </label>
              <select
                id="statusFilter"
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white"
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

            <div className="flex items-end">
              <button
                onClick={actions.clearFilters}
                className="px-4 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                Limpiar filtros
              </button>
            </div>
          </div>

          {(filters.searchTerm || filters.selectedStatus) && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-blue-700 font-medium">
                  Filtros aplicados:
                </span>

                {filters.searchTerm && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                    Búsqueda: "{filters.searchTerm}"
                    <button
                      onClick={() => filters.setSearchTerm("")}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                )}

                {filters.selectedStatus && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                    Estatus:{" "}
                    {
                      statusOptions.find(
                        (opt) => opt.value === filters.selectedStatus
                      )?.label
                    }
                    <button
                      onClick={() => filters.setSelectedStatus("")}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                )}

                <button
                  onClick={actions.clearFilters}
                  className="ml-auto text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Limpiar todos
                </button>
              </div>
            </div>
          )}

          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Mostrando{" "}
              <span className="font-semibold">{filteredIdeas.length}</span> de{" "}
              <span className="font-semibold">{ideaList.length}</span> ideas
            </div>
            {filteredIdeas.length === 0 && ideaList.length > 0 && (
              <div className="text-sm text-orange-600">
                No se encontraron resultados con los filtros aplicados
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          {loading ? (
            <div className="py-12 text-center text-gray-500">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mb-4"></div>
              <p>Cargando datos...</p>
            </div>
          ) : error ? (
            <div className="py-12 text-center">
              <div className="text-red-500 font-medium mb-2">{error}</div>
              <button
                onClick={actions.refresh}
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-all"
              >
                Reintentar
              </button>
            </div>
          ) : (
            <>
              {filteredIdeas.length > 0 ? (
                <IdeaTable
                  data={filteredIdeas}
                  searchTerm={filters.searchTerm}
                  onSearchChange={filters.setSearchTerm}
                />
              ) : (
                <div className="py-12 text-center">
                  <div className="text-gray-500 mb-4">
                    {ideaList.length === 0
                      ? "No hay ideas registradas"
                      : "No se encontraron ideas con los filtros aplicados"}
                  </div>
                  {ideaList.length > 0 && (
                    <button
                      onClick={actions.clearFilters}
                      className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-all"
                    >
                      Ver todas las ideas
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Administrator;
