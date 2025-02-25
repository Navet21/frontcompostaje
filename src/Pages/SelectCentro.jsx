import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";

export default function SelectCentro() {
  const usuarioID = localStorage.getItem("usuarioId");
  const { data: centroUser, loading, error } = useFetch(`https://pablo.informaticamajada.es/api/users/${usuarioID}/centros`);
  const navigate = useNavigate(); // Hook para navegar

  useEffect(() => {
    if (centroUser && centroUser.length > 0) {
      localStorage.setItem("centros", JSON.stringify(centroUser));

      // Si solo hay un centro, redirigimos automáticamente
      if (centroUser.length === 1) {
        navigate(`/${centroUser[0].id}`);
      }
    }
  }, [centroUser, navigate]);

  if (loading) return <p className="text-center text-gray-200">Cargando centros...</p>;
  if (error) return <p className="text-center text-red-400">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-800 text-center text-white">
      <h2 className="mb-4">Selecciona el centro</h2>
      {centroUser.map((centro) => (
        <Link key={centro.id} to={`/${centro.id}`}>
          <div className="rounded-2xl flex justify-center items-center bg-gray-700 text-white p-6 mb-4 shadow">
            <h2>{centro.nombre}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
}
