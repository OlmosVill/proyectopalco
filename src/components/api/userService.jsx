import axios from 'axios';

// Configura la instancia de axios con la URL base
const apiClient = axios.create({
  baseURL: 'https://palcoapi20241121001055.azurewebsites.net', // Cambié la URL base aquí
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para hacer login
export const login = async (username, password) => {
  try {
    const response = await apiClient.post('/Palco/Login', { Username: username, Password: password });
    return response.data;
  } catch (error) {
    console.error('Error al hacer login:', error);
    throw error;
  }
};

export default apiClient;
