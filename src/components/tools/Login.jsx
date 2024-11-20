import React, { useState } from 'react';
import { login } from '../api/userService';
import ObtenerComponent from './HomeScreen'; // Componente para obtener la lista
import CrearComponent from './CreatePrevio'; // Componente para crear un nuevo registro

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si el login fue exitoso
  const [showCreate, setShowCreate] = useState(false); // Estado para mostrar el componente de crear
  const [showGet, setShowGet] = useState(false); // Estado para mostrar el componente de obtener

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const user = await login(formData.username, formData.password);
    //   alert(`Bienvenido, ${user.username}!`);
      setIsLoggedIn(true); // Cambia el estado de login a verdadero si es exitoso
    } catch (err) {
      setError('Usuario o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium">Nombre de Usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>
        

        <div>
          <label htmlFor="password" className="block text-sm font-medium">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 mt-4 bg-blue-500 text-white font-bold rounded ${loading ? 'opacity-50' : ''}`}
          disabled={loading}
        >
          {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>
      </form>

      {/* Mostrar los botones solo si el login es exitoso */}
      {isLoggedIn && (
        <div className="mt-6">
          <button
            onClick={() => setShowCreate(!showCreate)}
            className="w-full py-2 mb-4 bg-green-500 text-white font-bold rounded"
          >
            {showCreate ? 'Ocultar Crear' : 'Crear Nuevo'}
          </button>

          <button
            onClick={() => setShowGet(!showGet)}
            className="w-full py-2 bg-blue-500 text-white font-bold rounded"
          >
            {showGet ? 'Ocultar Obtener' : 'Obtener Registros'}
          </button>
        </div>
      )}

      {/* Mostrar los componentes de Obtener y Crear */}
      {showCreate && <CrearComponent />}
      {showGet && <ObtenerComponent />}
    </div>
  );
};

export default Login;
