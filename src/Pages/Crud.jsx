import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserEdit, FaTrash, FaTimes, FaPlus } from 'react-icons/fa';

const API_URL = 'https://pablo.informaticamajada.es/api/centros/1/users';

const Crud = () => {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ id: null, name: '', email: '', admin: 0 });
    const [editing, setEditing] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    // Cargar usuarios desde la API
    const loadUsers = async () => {
        try {
            const response = await axios.get(API_URL);
            setUsers(response.data);
        } catch (error) {
            console.error('Error al cargar usuarios:', error);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Crear usuario
    const createUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post(API_URL, form);
            setForm({ id: null, name: '', email: '', admin: 0 });
            loadUsers();
        } catch (error) {
            console.error('Error al crear usuario:', error);
        }
    };

    // Editar usuario (carga en el formulario)
    const editUser = (user) => {
        setForm(user);
        setEditing(true);
    };

    // Actualizar usuario
    const updateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${API_URL}/${form.id}`, form);
            setForm({ id: null, name: '', email: '', admin: 0 });
            setEditing(false);
            loadUsers();
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
        }
    };

    // Mostrar diálogo de confirmación antes de eliminar
    const confirmDelete = (user) => {
        setUserToDelete(user);
        setShowDialog(true);
    };

    // Eliminar usuario
    const deleteUser = async () => {
        try {
            await axios.delete(`${API_URL}/${userToDelete.id}`);
            loadUsers();
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
        }
        setShowDialog(false);
        setUserToDelete(null);
    };

    return (
        <div className="max-w-5xl mx-auto mt-10 p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-lg shadow-lg transition-all">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
                Gestión de Usuarios
            </h2>

            {/* Formulario */}
            <form onSubmit={editing ? updateUser : createUser} className="mb-6 p-6 bg-white/70 dark:bg-gray-800/70 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input type="text" name="name" placeholder="Nombre" value={form.name} onChange={handleChange}
                        className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />

                    <input type="email" name="email" placeholder="Correo" value={form.email} onChange={handleChange}
                        className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />

                    <select name="admin" value={form.admin} onChange={handleChange}
                        className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <option value="0">Usuario</option>
                        <option value="1">Administrador</option>
                    </select>
                </div>

                <div className="flex justify-center gap-4 mt-6">
                    <button type="submit"
                        className="px-5 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600 flex items-center gap-2">
                        <FaPlus /> {editing ? 'Actualizar' : 'Crear'}
                    </button>
                    {editing && (
                        <button onClick={() => { setEditing(false); setForm({ id: null, name: '', email: '', admin: 0 }); }}
                            className="px-5 py-3 bg-gray-400 text-white font-bold rounded-lg hover:bg-gray-500 transition dark:bg-gray-500 dark:hover:bg-gray-600 flex items-center gap-2">
                            <FaTimes /> Cancelar
                        </button>
                    )}
                </div>
            </form>

            {/* Lista de usuarios */}
            <ul className="space-y-4">
                {users.map((user) => (
                    <li key={user.id} className="flex flex-col md:flex-row justify-between items-center p-6 bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-md">
                        <div className="text-center md:text-left">
                            <p className="text-dark dark:text-white text-lg font-semibold">{user.name}</p>
                            <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
                            <p className="text-sm text-blue-500 dark:text-blue-400">{user.admin ? 'Administrador' : 'Usuario'}</p>
                        </div>
                        <div className="flex gap-2 mt-4 md:mt-0">
                            <button onClick={() => editUser(user)}
                                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition flex items-center gap-2">
                                <FaUserEdit /> Editar
                            </button>
                            <button onClick={() => confirmDelete(user)}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2">
                                <FaTrash /> Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Diálogo de confirmación */}
            {showDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">¿Eliminar usuario?</h3>
                        <p className="text-gray-600 dark:text-gray-300">Esta acción no se puede deshacer.</p>
                        <div className="flex justify-center gap-4 mt-6">
                            <button onClick={deleteUser} className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                                Sí, eliminar
                            </button>
                            <button onClick={() => setShowDialog(false)} className="px-5 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Crud;
