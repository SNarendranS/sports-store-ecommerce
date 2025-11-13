import axios from 'axios';
import { getAuthHeaders } from '../Utils/headerToken';

const API_BASE_URL = import.meta.env.VITE_API_URI + '/fav';

const add = async (productid) => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, { productid }, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error('Error adding to favorite:', error.response?.data || error.message);
    throw error;
  }
};

const getUserFav = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error('Error fetching favorite:', error.response?.data || error.message);
    throw error;
  }
};

const FindItem = async (productId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/find/${productId}`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error('Error fetching item favorite:', error.response?.data || error.message);
    throw error;
  }
};


const remove = async (productid) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}`, {
      headers: getAuthHeaders(),
      data: { productid }, // 👈 Must go inside `data`
    });

    return response.data;
  } catch (error) {
    console.error(
      'Error removing favorite item:',
      error.response?.data || error.message
    );
    throw error;
  }
};


export default { add, remove, getUserFav, FindItem};
