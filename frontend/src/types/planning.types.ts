// Planning Grid Types

export interface DateRange {
    startDate: string;
    endDate: string;
}

export interface PlanningFilters {
    siteId?: string;
    zoneId?: string;
    unitTypeId?: string;
    search?: string;
    statuses?: ReservationStatus[];
}

export type ReservationStatus =
    | 'pending'
    | 'confirmed'
    | 'checked_in'
    | 'checked_out'
    | 'cancelled';

export interface PlanningGuest {
    id: string;
    name: string;
    email?: string;
    phone?: string;
}

export interface PlanningReservation {
    id: string;
    checkInDate: string;
    checkOutDate: string;
    nights: number;
    status: ReservationStatus;
    adults: number;
    children: number;
    totalAmount: number;
    paidAmount: number;
    guest: PlanningGuest;
    notes?: string;
}

export interface UnitType {
    id: string;
    name: string;
    category: string;
    maxOccupancy: number;
    basePrice?: number;
}

export interface Zone {
    id: string;
    name: string;
}

export interface PlanningUnit {
    id: string;
    name: string;
    status: string;
    zone: Zone;
    unitType: UnitType;
    reservations: PlanningReservation[];
}

export interface PlanningData {
    dateRange: DateRange;
    units: PlanningUnit[];
}

export interface PlanningQueryParams {
    startDate: string;
    endDate: string;
    siteId?: string;
    zoneId?: string;
    unitTypeId?: string;
}

// Extended types for Reservation Details

export interface Charge {
    id: string;
    description: string;
    amount: number;
    date: string;
    category: string;
}

export interface Payment {
    id: string;
    amount: number;
    paymentMethod: string;
    date: string;
    reference?: string;
}

export interface Folio {
    id: string;
    folioNumber: string;
    totalCharges: number;
    totalPayments: number;
    balance: number;
    charges: Charge[];
    payments: Payment[];
}

export interface CheckIn {
    id: string;
    tenantId: string;
    reservationId: string;
    guestId: string;
    companions: any;
    vehicles: any;
    signatureUrl?: string;
    checkedInAt: string;
    createdAt: string;
}

export interface ReservationUnit {
    id: string;
    name: string;
    unitType: UnitType;
    zone: Zone;
}

export interface ReservationGuest {
    id: string;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    documentType?: string;
    documentNumber?: string;
    address?: string;
    city?: string;
    province?: string;
    postalCode?: string;
    country?: string;
    nationality?: string;
}

export interface ReservationDetails {
    id: string;
    checkInDate: string;
    checkOutDate: string;
    nights: number;
    status: ReservationStatus;
    adults: number;
    children: number;
    totalAmount: number;
    paidAmount: number;
    notes?: string;
    guest: ReservationGuest;
    unit: ReservationUnit;
    folio?: Folio;
    checkIn?: CheckIn;
    createdAt: string;
    updatedAt: string;
}

