export default function Errores() {
    return (
        <div className="container mx-auto text-center text-black dark:text-white p-6">
            <h1 className="text-2xl font-bold">Control de errores</h1>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
                La aplicación de compostaje está en desarrollo y puede contener errores.
                Si encuentras algún problema, por favor repórtalo a continuación.
            </p>
            
            <form className="mt-4 max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <label className="block text-left text-gray-700 dark:text-gray-300 font-medium">Correo electrónico:</label>
                <input 
                    type="email"
                    className="w-full p-2 mt-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Tu correo electrónico"
                />

                <label className="block text-left text-gray-700 dark:text-gray-300 font-medium mt-4">Asunto:</label>
                <input 
                    type="text"
                    className="w-full p-2 mt-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Asunto del reporte"
                />

                <label className="block text-left text-gray-700 dark:text-gray-300 font-medium mt-4">Descripción del error:</label>
                <textarea 
                    className="w-full p-2 mt-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    rows="4"
                    placeholder="Describe el error que encontraste..."
                ></textarea>
                
                <button 
                    type="submit" 
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
                >
                    Enviar reporte
                </button>
            </form>
        </div>
    );
}
