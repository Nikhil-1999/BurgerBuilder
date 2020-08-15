import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://react-burger-builder-4295a.firebaseio.com/'
});

export default axiosInstance;