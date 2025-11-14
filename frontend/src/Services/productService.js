import axios from 'axios';

const API_URI = import.meta.env.VITE_API_URI + '/product';

// Optional: get token from localStorage for authorized routes
const getAuthConfig = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Product API calls
const getAllProducts = () => axios.get(`${API_URI}`);
const getAllOfferProducts = () => axios.get(`${API_URI}/offers`);
const getAllProductsCategories = () => axios.get(`${API_URI}/category`);

const getProductById = (id) => axios.get(`${API_URI}/${id}`);
const availableStock = (productid) => axios.post(`${API_URI}/stock`, productid);

const createProduct = (productData) => axios.post(`${API_URI}`, productData, getAuthConfig());
const updateProduct = (id, updateData) => axios.put(`${API_URI}/${id}`, updateData, getAuthConfig());
const deleteProduct = (id) => axios.delete(`${API_URI}/${id}`, getAuthConfig());
const ProductService = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllOfferProducts,
  getAllProductsCategories,
  availableStock
};

export default ProductService;
