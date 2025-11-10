import axios from 'axios';
import { getAuthHeaders } from '../Utils/headerToken';

const API_BASE_URL = import.meta.env.VITE_API_URI;
const API_USER_URL = API_BASE_URL + '/user';
const API_PROFLIE_URL = API_BASE_URL + '/profile';



const getUserData = async () => {
  try {
    const response = await axios.get(`${API_USER_URL}/email`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error.response?.data || error.message);
    throw error;
  }
};

// ✅ New update method
const updateUserData = async (updateDetail) => {
  try {

    const res = await axios.put(`${API_USER_URL}/update`, {
      updateDetail
    }, { headers: getAuthHeaders() })

    return res.data.user // Returns updated user for frontend use
  } catch (error) {
    console.error('Error updating user:', error)
    throw error.response?.data || { message: 'Failed to update user' }
  }
}


const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_PROFLIE_URL}`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error.response?.data || error.message);
    throw error;
  }
};
const UserService = {
  getUserData, getUserProfile, updateUserData
};

export default UserService;