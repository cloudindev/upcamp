import api from './api';

export const guestsApi = {
    getAll: async (params?: { search?: string }) => {
        const response = await api.get('/guests', { params });
        return response.data;
    },

    getById: async (id: string) => {
        const response = await api.get(`/guests/${id}`);
        return response.data;
    },

    create: async (data: any) => {
        const response = await api.post('/guests', data);
        return response.data;
    },

    update: async (id: string, data: any) => {
        const response = await api.patch(`/guests/${id}`, data);
        return response.data;
    },

    delete: async (id: string) => {
        const response = await api.delete(`/guests/${id}`);
        return response.data;
    }
};
