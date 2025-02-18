import { useState } from "react";
import { login, getUser } from "./Api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      const userData = await getUser();
      setUser(userData);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">
          Iniciar Sesión
        </h2>

        {user ? (
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              Bienvenido, {user.name} 🎉
            </h3>
          </div>
        ) : (
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
        )}

        {error && (
          <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
