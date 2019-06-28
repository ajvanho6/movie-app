import axios from 'axios';
import config from '../config';

const axiosInstance = axios.create({
    baseURL: config.BASE_API_URL,
    headers: {
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
