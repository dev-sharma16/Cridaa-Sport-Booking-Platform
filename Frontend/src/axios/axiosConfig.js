import axios from 'axios';

const baseUrl = import.meta.env.VITE_Base_Url;

const axiosInstance = axios.create({
    baseURL: baseUrl, 
    withCredentials: true,                
});

export default axiosInstance;
