import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, getUser } from "./Api";
import ThemeToggle from "./ThemeToggle";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Hook para redirigir

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      await getUser(); // Puedes guardar esto en el contexto si lo necesitas
      navigate("/"); // Redirige a SelectCentro
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Contenedor del formulario de login */}
      <div className="relative bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-96">
        {/* ThemeToggle dentro del login en la esquina superior derecha */}
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-amber-400 outline-none"
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
              className="w-full px-4 py-2 mt-1 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-amber-400 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-amber-500 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Iniciar Sesión
          </button>
        </form>

        {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
