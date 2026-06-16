import React from "react";
import { useDataImage } from "../components/hooks/UseDataImage";

function PageImage() {
  const { images, loading, error, refetch } = useDataImage();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Imagen aleatoria de un perro</h1>
      {images && <img src={images} alt="Perro aleatorio"/>}
      <button onClick={refetch}>Cargar otra imagen</button>
    </div>
  );
}

export default PageImage;