import api from './api';

export interface Reservation {
    id: string;
    unitId: string;
    guestId: string;
    checkInDate: Date;
    checkOutDate: Date;
    status: string;
    totalPrice: number;
    unit?: {
        name: string;
        unitType: {
            name: string;
        };
    };
    guest?: {
        firstName: string;
        lastName: string;
    };
}

export interface DashboardStats {
    totalBookings: number;
    currentOccupancy: number;
    arrivalsToday: number;
    monthlyRevenue: number;
    weeklyOccupancy: {
        day: string;
        percentage: number;
    }[];
}

export const reservationService = {
    getAll: async (): Promise<Reservation[]> => {
        const response = await api.get<Reservation[]>('/reservations');
        return response.data;
    },

    getById: async (id: string): Promise<Reservation> => {
        const response = await api.get<Reservation>(`/reservations/${id}`);
        return response.data;
    },

    create: async (data: Partial<Reservation>): Promise<Reservation> => {
        const response = await api.post<Reservation>('/reservations', data);
        return response.data;
    },

    update: async (id: string, data: Partial<Reservation>): Promise<Reservation> => {
        const response = await api.put<Reservation>(`/reservations/${id}`, data);
        return response.data;
    },

    getDashboardStats: async (): Promise<DashboardStats> => {
        const response = await api.get<DashboardStats>('/reservations/stats/dashboard');
        return response.data;
    },
};
