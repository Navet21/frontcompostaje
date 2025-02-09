import { useEffect, useState } from "react";

export default function CentrosList() {
  const [centros, setCentros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://161.22.45.252/api/centros")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCentros(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los centros:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando centros...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Lista de Centros</h2>
      <ul>
        {centros.map((centro) => (
          <li key={centro.id}>
            <strong>{centro.nombre}</strong> - {centro.direccion} ({centro.tipo})
          </li>
        ))}
      </ul>
    </div>
  );
}
