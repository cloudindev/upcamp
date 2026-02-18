import api from './api';
import { PlanningData, PlanningQueryParams } from '../types/planning.types';

export const planningApi = {
    /**
     * Fetch planning grid data
     */
    getPlanningData: async (params: PlanningQueryParams): Promise<PlanningData> => {
        const response = await api.get('/planning', { params });
        return response.data;
    },
};
