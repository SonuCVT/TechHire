import axios from 'axios';
import keycloak from '../auth/keycloak';
const api = axios.create({
  baseURL: 'http://localhost:8081/api',
});
api.interceptors.request.use(config => {
  if (keycloak.token) {
    config.headers.Authorization = `Bearer ${keycloak.token}`;
  }
  return config;
});
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await keycloak.updateToken(30);
        originalRequest.headers.Authorization = `Bearer ${keycloak.token}`;
        return api(originalRequest);
      } catch (refreshError) {
        keycloak.logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
export const getUserProfile = () => api.get('/auth/profile');
export const getHrData = () => api.get('/hr/dashboard');
export const getCandidateData = () => api.get('/candidate/dashboard');