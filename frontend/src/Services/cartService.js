import axios from 'axios';
import { getAuthHeaders } from '../Utils/headerToken';

const API_BASE_URL = import.meta.env.VITE_API_URI + '/cart';

const addToCart = async (productid, quantity = 1) => {
  try {

    const response = await axios.post(`${API_BASE_URL}`, { productid, quantity }, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error.response?.data || error.message);
    throw error;
  }
};

const getUserCart = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error.response?.data || error.message);
    throw error;
  }
};

const FindItemInCart = async (productId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/find/${productId}`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error('Error fetching item cart:', error.response?.data || error.message);
    throw error;
  }
};

const updateCartItem = async (productid, quantity) => {
  try {
    const response = await axios.put(`${API_BASE_URL}`, { productid, quantity }, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error('Error updating cart item:', error.response?.data || error.message);
    return error;
  }
};

const removeFromCart = async (productid) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}`, {
      headers: getAuthHeaders(),
      data: { productid }, // 👈 Must go inside `data`
    });

    return response.data;
  } catch (error) {
    console.error(
      'Error removing cart item:',
      error.response?.data || error.message
    );
    throw error;
  }
};


export default { addToCart, removeFromCart, updateCartItem, getUserCart, FindItemInCart };
