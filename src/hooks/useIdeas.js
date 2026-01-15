import { useCallback, useEffect, useState } from "react";
import config from "../../config";

export const useIdeas = () => {
  const [ideaList, setIdeaList] = useState([]);
  const [filteredIdeas, setFilteredIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const getIdeaList = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${config.apiUrl}/ContinuousImprovementForm/GetListIdeas`
      );
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }

      const data = await response.json();
      setIdeaList(data);
      setFilteredIdeas(data);
      setError(null);
    } catch (error) {
      console.error("Error: ", error);
      setIdeaList([]);
      setFilteredIdeas([]);
      setError("Error al cargar las ideas");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getIdeaList();
  }, [getIdeaList]);

  useEffect(() => {
    let filtered = ideaList;

    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (idea) =>
          idea.fullName?.toLowerCase().includes(term) ||
          idea.workArea?.toLowerCase().includes(term) ||
          idea.currentSituation?.toLowerCase().includes(term) ||
          idea.ideaDescription?.toLowerCase().includes(term)
      );
    }

    if (selectedStatus !== "") {
      filtered = filtered.filter((idea) => idea.status === selectedStatus);
    }

    setFilteredIdeas(filtered);
  }, [searchTerm, selectedStatus, ideaList]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedStatus("");
  };

  return {
    ideaList,
    filteredIdeas,
    loading,
    error,
    filters: {
      searchTerm,
      setSearchTerm,
      selectedStatus,
      setSelectedStatus,
    },
    actions: {
      refresh: getIdeaList,
      clearFilters,
    },
  };
};
