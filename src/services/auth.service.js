
import api from './api.js';

const register = async (name, email, password) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data.data;
};

const emailLogin = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data.data;
};

const getMe = async () => {
    const response = await api.get('/auth/me');
    return response.data.data;
};

const logout = async () => {
    const response = await api.post('/auth/logout');
    return response.data;
};

export { register, emailLogin, getMe, logout };