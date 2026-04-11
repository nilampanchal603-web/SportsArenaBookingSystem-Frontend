import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001',
    timeout: 60000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Optional: redirect to login or handle unauthorized error globally
            localStorage.removeItem('token');
            localStorage.removeItem('role');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
