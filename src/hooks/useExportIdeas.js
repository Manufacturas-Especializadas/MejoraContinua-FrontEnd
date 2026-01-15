import { useState } from "react";
import config from "../../config";
import Swal from "sweetalert2";

export const useExportIdeas = () => {
  const [downloading, setDownloading] = useState(false);

  const getCurrentDateTime = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}${month}${year}_${hours}${minutes}`;
  };

  const exportExcel = async (year = new Date().getFullYear()) => {
    try {
      setDownloading(true);

      Swal.fire({
        title: "Generando reporte...",
        html: "Por favor espere mientras se prepara tu archivo...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const url = `${config.apiUrl}/ContinuousImprovementForm/DownloadExcel?year=${year}`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: null,
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const blob = await response.blob();
      const urlBlob = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = urlBlob;
      link.setAttribute(
        "download",
        `IdeasMejora_${year}_${getCurrentDateTime()}.xlsx`
      );

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(urlBlob);

      Swal.close();
      Swal.fire({
        icon: "success",
        title: "Descarga completa",
        text: "El archivo se ha descargado correctamente",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error al exportar: ", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo descargar el archivo",
        timer: 2000,
        showConfirmButton: false,
      });
    } finally {
      setDownloading(false);
    }
  };

  return {
    downloading,
    exportExcel,
  };
};
