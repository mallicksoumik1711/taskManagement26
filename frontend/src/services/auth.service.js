import api from './api';

const login = (data) => {
    return api.post('/auth/login', data);
}

const register = (data) => {
    return api.post('/auth/register', data);
}   

const logout = () => {
    return api.post('/auth/logout');
}

export  default { login, register, logout };