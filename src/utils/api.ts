import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const processPrompt = async (prompt: string) => {
  try {
    const response = await api.post('/api/process', { prompt });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw { message: 'Network error' };
  }
};

export const getResponses = async (limit: number = 50, offset: number = 0) => {
  try {
    const response = await api.get(`/api/responses?limit=${limit}&offset=${offset}`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw { message: 'Network error' };
  }
};

export const getResponseById = async (id: string) => {
  try {
    const response = await api.get(`/api/responses/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw { message: 'Network error' };
  }
};

export default api;
