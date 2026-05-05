import { useState } from "react";
import config from "../../config";

export const useDeleteIdea = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const deleteIdea = async (id) => {
    setIsDeleting(true);
    setDeleteError(null);

    try {
      const response = await fetch(
        `${config.apiUrl}/ContinuousImprovementForm/Delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("No se pudo eliminar la idea. Inténtalo de nuevo.");
      }

      return { success: true };
    } catch (err) {
      setDeleteError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteIdea, isDeleting, deleteError };
};
