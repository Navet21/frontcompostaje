import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, getUser } from "./Api";
import ThemeToggle from "./ThemeToggle";
import bg from "../images/bg.jpg";


const Login = () => {
  localStorage.removeItem("verAdvertencia");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      await getUser();
      navigate("/select");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Contenedor izquierdo: Formulario */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-100 dark:bg-gray-900 p-8">
        <div className="relative bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-md">
          {/* Botón de cambio de tema */}
          <div className="absolute top-4 right-4">
            <ThemeToggle />
          </div>

          <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-6">
            Iniciar Sesión
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 mt-1 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:focus:ring-amber-400 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Contraseña:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 mt-1 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:focus:ring-amber-400 outline-none transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
            >
              Iniciar Sesión
            </button>
          </form>

          {error && (
            <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
          )}
        </div>
      </div>

      {/* Contenedor derecho: Imagen */}
      <div className="hidden md:block md:w-1/2">
        <img
          src={bg} 
          alt="Imagen de login"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
