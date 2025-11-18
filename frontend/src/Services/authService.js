import axios from 'axios';
import { getAuthHeaders } from '../Utils/headerToken';

const API_URI = import.meta.env.VITE_API_URI + '/auth';

const register = (userDetails) => axios.post(`${API_URI}/register`, userDetails);
const adminRegister = (userDetails) => axios.post(`${API_URI}/admin/register`, userDetails);
const login = (user) => axios.post(`${API_URI}`, user);
const logout = () => {
    const res = axios.get(`${API_URI}`,
        {
            headers: getAuthHeaders()
        });
    return res;
};

const AuthService = { register, login, logout, adminRegister };
export default AuthService;
