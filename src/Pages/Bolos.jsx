import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { VscGraph } from "react-icons/vsc";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { FaEye } from "react-icons/fa";

export default function Bolos() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  let [searchParams, setSearchParams] = useSearchParams();

  const { data: bolosData, loading, error } = useFetch(`http://localhost/api/bolos?page=${currentPage}`);
  localStorage.setItem("bolos", true);


  const handleChange = (e) => {
    setSearchParams({ [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (bolosData) {
      setTotalPages(bolosData.meta.last_page);
    }
  }, [bolosData]);

  if (loading) return <p className="text-center text-gray-200">Cargando Bolos...</p>;
  if (error) return <p className="text-center text-red-400">Error: {error}</p>;

  let bolos = bolosData.data || [];


  const filterText = searchParams.get("filter") || "";

  if (filterText.trim() !== "") {
    bolos = bolos.filter(item => item.nombre.toLowerCase().includes(filterText.toLowerCase()));
  }

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-6 text-black dark:text-gray-200">
      {/* 🔹 Barra de búsqueda */}
      <input
        type="text"
        name="filter"
        onChange={handleChange}
        className="form-control my-3 border border-gray-500 rounded px-4 py-2 text-black dark:text-white bg-gray-100 dark:bg-gray-900"
        alt="buscador"
        placeholder="Buscar por nombre..."
        value={filterText}
      />

      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Lista de Bolos</h2>

      <div className="overflow-x-auto">
        <table className="w-full border bg-white dark:bg-gray-800 border-gray-700 rounded-lg text-black dark:text-white">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-black dark:text-gray-300">
              <th className="py-3 px-5 text-left border-b border-gray-300 dark:border-gray-700">Nombre</th>
              <th className="py-3 px-5 text-left border-b border-gray-300 dark:border-gray-700">Ciclo en Curso</th>
              <th className="py-3 px-5 text-left border-b border-gray-300 dark:border-gray-700">Descripción</th>
              <th className="py-3 px-5 text-center border-b border-gray-300 dark:border-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {bolos.length > 0 ? (
              bolos.map((bolo, index) => (
                <tr key={bolo.id} className={`border-b border-gray-300 dark:border-gray-700 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-700'}`}>
                  <td className="py-3 px-5">{bolo.nombre}</td>
                  <td className="py-3 px-5">{bolo.ciclos}</td>
                  <td className="py-3 px-5">{bolo.descripcion}</td>
                  <td className="py-3 px-5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Link to={`${bolo.id}`} className="bg-green-500 hover:bg-green-400 text-black p-2 rounded-full shadow-md transition-all transform hover:scale-110 flex items-center justify-center" title="Ver gráfico">
                        <VscGraph size={16} />
                      </Link>
                      <Link to={`/registrosBolo/${bolo.id}`} className="bg-green-500 hover:bg-green-400 text-black p-2 rounded-full shadow-md transition-all transform hover:scale-110 flex items-center justify-center" title="Ver Registros">
                        <FaEye size={16} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-3 text-gray-500">No se encontraron resultados.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* 🔹 Paginación (solo si no se está filtrando) */}
        {filterText === "" && (
          <div className="pagination flex justify-between mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`mx-1 px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-500 text-gray-300 cursor-not-allowed' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
            >
              Anterior
            </button>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`mx-1 px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-500 text-gray-300 cursor-not-allowed' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
