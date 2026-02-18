import api from './api';

export const reservationsApi = {
    /**
     * Fetch full reservation details by ID
     */
    getReservationById: async (id: string) => {
        const response = await api.get(`/reservations/${id}`);
        return response.data;
    },

    createReservation: async (data: any) => {
        const response = await api.post('/reservations', data);
        return response.data;
    },

    updateReservation: async (id: string, data: any) => {
        const response = await api.put(`/reservations/${id}`, data);
        return response.data;
    },
};
