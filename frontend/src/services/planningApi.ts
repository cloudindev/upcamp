import axios from 'axios';
import { PlanningData, PlanningQueryParams } from '../types/planning.types';

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

export const planningApi = {
    /**
     * Fetch planning grid data
     */
    getPlanningData: async (params: PlanningQueryParams): Promise<PlanningData> => {
        const response = await apiClient.get('/planning', { params });
        return response.data;
    },
};
