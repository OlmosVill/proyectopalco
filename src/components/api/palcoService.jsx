import apiClient from './axios';

// Obtener una lista de registros
export const getPrevios = async () => {
  try {
    const response = await apiClient.get('/');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo datos:', error);
    throw error;
  }
};

// Crear un nuevo registro
export const createPrevio = async (nuevoPrevio) => {
  try {
    const response = await apiClient.post('/', nuevoPrevio);
    return response.data;
  } catch (error) {
    console.error('Error creando registro:', error);
    throw error;
  }
};

export const login = async (nuevoPrevio) => {
    try {
      const response = await apiClient.post('/Login', nuevoPrevio);
      return response.data;
    } catch (error) {
      console.error('Error creando registro:', error);
      throw error;
    }
  };