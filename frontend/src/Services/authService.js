import axios from 'axios';

const API_URI = import.meta.env.VITE_API_URI+'/auth';

const register = (userDetails) => axios.post(`${API_URI}/register`, userDetails);
const adminRegister = (userDetails) => axios.post(`${API_URI}/admin/register`, userDetails);
const login = (user) => axios.post(`${API_URI}`, user);
const logout = () => localStorage.removeItem('token');

const AuthService = { register, login, logout, adminRegister };
export default AuthService;
