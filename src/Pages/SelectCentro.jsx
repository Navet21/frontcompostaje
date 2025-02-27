import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";

export default function SelectCentro() {
  const usuarioID = localStorage.getItem("usuarioId");
  const { data: centroUser, loading, error } = useFetch(`http://localhost/api/users/${usuarioID}/centros`);
  const navigate = useNavigate();

  useEffect(() => {
    if (centroUser && centroUser.length > 0) {
      localStorage.setItem("centros", JSON.stringify(centroUser));

      if (centroUser.length === 1) {
        navigate(`/${centroUser[0].id}`);
      }
    }
  }, [centroUser, navigate]);

  if (loading) return <p className="text-center text-gray-400">Cargando centros...</p>;
  if (error) return <p className="text-center text-red-400">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-center text-white flex flex-col items-center justify-center px-4">
      <h2 className="mb-6 text-2xl font-semibold text-green-400">Selecciona el centro</h2>
      <div className="w-full max-w-md space-y-4">
        {centroUser.map((centro) => (
          <Link key={centro.id} to={`/${centro.id}`} className="block">
            <div className="rounded-2xl flex justify-center items-center p-6 shadow-md transition-all border border-green-500 
                            bg-green-600 text-white hover:bg-green-500 hover:scale-105 active:scale-100">
              <h2 className="text-lg font-medium">{centro.nombre}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
