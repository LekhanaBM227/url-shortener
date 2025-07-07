import axios from 'axios';

const apiService = axios.create({
  baseURL: 'http://localhost:8080',
});

// Interceptor to add the JWT token to every request
apiService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiService;