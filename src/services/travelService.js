import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = `${apiUrl}/travels`;

export const TravelService = {
    getAllPublic: async() => {
        const response = await axios.get(`${baseUrl}/allTravels`)
        return response.data

    },
  getAll: async (authHeader) => {
    const response = await axios.get(baseUrl, {
      headers: { Authorization: authHeader },
    });
    return response.data;
  },

  getById: async (id, authHeader) => {
    const response = await axios.get(`${baseUrl}/${id}`, {
      headers: { Authorization: authHeader },
    });
    return response.data;
  },

  update: async (id, data, authHeader) => {
    const response = await axios.patch(`${baseUrl}/${id}`, data, {
      headers: { Authorization: authHeader },
    });
    return response.data;
  },

  delete: async (id, authHeader) => {
    const response = await axios.delete(`${baseUrl}/${id}`, {
      headers: { Authorization: authHeader },
    });
    return response.data;
  },

  // etc...
};

export default TravelService;
