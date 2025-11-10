import axios from 'axios';
import { getAuthHeaders } from '../Utils/headerToken';

const API_BASE_URL = import.meta.env.VITE_API_URI + '/user';



const getUserData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/email`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error.response?.data || error.message);
    throw error;
  }
};

const UserService = {
  getUserData
};

export default UserService;