import axios from 'axios';

// Configura la instancia de axios con la URL base
const apiClient = axios.create({
  baseURL: 'https://localhost:7273/api/Palco', // Cambié la URL base aquí
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para hacer login
export const login = async (username, password) => {
  try {
    const response = await apiClient.post('/Login', { Username: username, Password: password });
    return response.data;
  } catch (error) {
    console.error('Error al hacer login:', error);
    throw error;
  }
};

export default apiClient;
