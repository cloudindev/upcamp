import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
    // Read from Zustand's persisted auth-storage
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
        const { state } = JSON.parse(authStorage);
        if (state?.token) {
            config.headers.Authorization = `Bearer ${state.token}`;
        }
    }
    return config;
});

export const reservationsApi = {
    /**
     * Fetch full reservation details by ID
     */
    getReservationById: async (id: string) => {
        const response = await apiClient.get(`/reservations/${id}`);
        return response.data;
    },

    createReservation: async (data: any) => {
        const response = await apiClient.post('/reservations', data);
        return response.data;
    },

    updateReservation: async (id: string, data: any) => {
        const response = await apiClient.put(`/reservations/${id}`, data);
        return response.data;
    },
};
