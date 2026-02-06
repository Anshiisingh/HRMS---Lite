import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;

export const employeeService = {
    getAll: () => api.get('/employees'),
    create: (data) => api.post('/employees', data),
    delete: (id) => api.delete(`/employees/${id}`),
};

export const attendanceService = {
    get: (employeeId) => api.get(`/attendance/${employeeId}`),
    mark: (data) => api.post('/attendance', data),
};

export const dashboardService = {
    getStats: () => api.get('/dashboard'),
};
