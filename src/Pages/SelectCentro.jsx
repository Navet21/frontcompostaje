import { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
export default function SelectCentro() {
  const { data: centroUser, loading, error } = useFetch(`https://pablo.informaticamajada.es/api/users/1/centros`);

  useEffect(() => {
    if (centroUser && centroUser.length > 0) {
      localStorage.setItem("centros", JSON.stringify(centroUser));
    }
  }, [centroUser]);

  if (loading) return <p className="text-center text-gray-200">Cargando centros...</p>;
  if (error) return <p className="text-center text-red-400">Error: {error}</p>;

  return (
    <div className="text-center text-black dark:text-white mt-4">
        <h2 className="mb-4">Selecciona el centro</h2>
      {centroUser.map((centro) => (
        <Link key={centro.id} to={`/${centro.id}`}>
            <div className="rounded-2xl flex justify-center items-center bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-6 mb-4 shadow">
              <h2>{centro.nombre}</h2>
            </div>        
        </Link>
      ))}
    </div>
  );
}