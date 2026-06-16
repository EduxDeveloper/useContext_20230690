import { useCallback, useEffect, useState } from "react";

const API_URL = "https://dog.ceo/api/breeds/image/random";

export function useDataImage() {
  const [images, setImage] = useState(); // Estado para almacenar la URL de la imagen
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga
  const [error, setError] = useState(null); // Estado para manejar errores

  const fetchPizzas = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}`, {
        method: "GET",
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.message || "No se pudo cargar la imagen");
      }

      const data = await response.json();
      setImage(data.message); // Aquí actualizamos el estado con la URL de la imagen
    } catch (fetchError) {
      setError(
        fetchError instanceof Error ? fetchError.message : "Error inesperado"
      );
      setImage(null); // En caso de error, aseguramos que el estado sea null
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPizzas();
  }, [fetchPizzas]);

  return {
    images,
    loading,
    error,
    refetch: fetchPizzas,
  };
}

export default useDataImage;