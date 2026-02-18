import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config) => {
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
        const { state } = JSON.parse(authStorage);
        if (state?.token) {
            config.headers.Authorization = `Bearer ${state.token}`;
        }
    }
    return config;
});

export const guestsApi = {
    getAll: async (params?: { search?: string }) => {
        const response = await apiClient.get('/guests', { params });
        return response.data;
    },

    getById: async (id: string) => {
        const response = await apiClient.get(`/guests/${id}`);
        return response.data;
    },

    create: async (data: any) => {
        const response = await apiClient.post('/guests', data);
        return response.data;
    },

    update: async (id: string, data: any) => {
        const response = await apiClient.patch(`/guests/${id}`, data);
        return response.data;
    },

    delete: async (id: string) => {
        const response = await apiClient.delete(`/guests/${id}`);
        return response.data;
    }
};
