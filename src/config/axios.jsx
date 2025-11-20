import axios from 'axios';

const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
console.log('🔧 Axios configurado con baseURL:', `${backendURL}/api`);

const clienteAxios = axios.create({
    baseURL: `${backendURL}/api`
})

// Interceptor para debug de requests
clienteAxios.interceptors.request.use(
    (config) => {
        console.log('📤 Request:', config.method?.toUpperCase(), config.url);
        console.log('📤 Headers:', config.headers);
        console.log('📤 Data:', config.data);
        return config;
    },
    (error) => {
        console.error('❌ Request error:', error);
        return Promise.reject(error);
    }
);

// Interceptor para debug de responses
clienteAxios.interceptors.response.use(
    (response) => {
        console.log('📥 Response:', response.status, response.config.url);
        console.log('📥 Data:', response.data);
        return response;
    },
    (error) => {
        console.error('❌ Response error:', error);
        console.error('❌ Status:', error.response?.status);
        console.error('❌ Data:', error.response?.data);
        console.error('❌ URL:', error.config?.url);
        return Promise.reject(error);
    }
);

export default clienteAxios;