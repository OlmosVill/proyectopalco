import axios from 'axios';

// Crear una instancia de Axios
const apiClient = axios.create({
  baseURL: 'https://localhost:7273/api/Palco', // Cambia esto si necesitas otra ruta base
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000, // Tiempo máximo de espera para la solicitud
});

export default apiClient;