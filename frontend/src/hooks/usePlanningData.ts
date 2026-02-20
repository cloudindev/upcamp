import { useQuery } from '@tanstack/react-query';
import { planningApi } from '../services/planningApi';
import { PlanningQueryParams } from '../types/planning.types';

export const usePlanningData = (params: PlanningQueryParams) => {
    return useQuery({
        queryKey: ['planning', params],
        queryFn: () => planningApi.getPlanningData(params),
        staleTime: 30000, // 30 seconds
        refetchOnWindowFocus: true,
    });
};
