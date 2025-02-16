import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
export default function SelectCentro() {
  const { data: centroUser, loading, error } = useFetch(`https://pablo.informaticamajada.es/api/users/1/centros`);

  if (loading) return <p className="text-center text-gray-200">Cargando nombre del centro...</p>;
  if (error) return <p className="text-center text-red-400">Error: {error}</p>;

  return (
    <div className="text-center text-white">
      {centroUser.map((centro) => (
        <Link key={centro.id} to={`/${centro.id}`}>
        <h2 key={centro.id}>{centro.nombre}</h2>
        </Link>
      ))}
    </div>
  );
}