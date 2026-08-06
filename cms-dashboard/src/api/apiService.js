import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (username, password) =>
    apiClient.post('/auth/login', { username, password })
};

export const salesAPI = {
  getPaginated: (page, limit = 20) =>
    apiClient.get(`/sales?page=${page}&limit=${limit}`),
  create: (data) =>
    apiClient.post('/sales', data),
  update: (id, data) =>
    apiClient.put(`/sales/${id}`, data),
  delete: (id) =>
    apiClient.delete(`/sales/${id}`),
  getSummary: () =>
    apiClient.get('/sales/summary')
};

export default apiClient;