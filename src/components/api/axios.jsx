import axios from 'axios';

// Crear una instancia de Axios
const apiClient = axios.create({
  baseURL: 'https://palcoapi20241121001055.azurewebsites.net', // Cambia esto si necesitas otra ruta base
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000, // Tiempo máximo de espera para la solicitud
});

export default apiClient;