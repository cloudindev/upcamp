import { useState, useMemo } from 'react';
import { startOfWeek, addDays, format } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import DateNavigator from '../components/planning/DateNavigator';
import PlanningFilters from '../components/planning/PlanningFilters';
import PlanningGrid from '../components/planning/PlanningGrid';
import ReservationDetailsModal from '../components/modals/ReservationDetailsModal';
import CreateReservationModal, { CreateReservationData } from '../components/modals/CreateReservationModal';
import { UpdateReservationData } from '../components/modals/EditReservationModal';
import { usePlanningData } from '../hooks/usePlanningData';
import { reservationsApi } from '../services/reservationsApi';
import { PlanningFilters as PlanningFiltersType, PlanningUnit } from '../types/planning.types';

export default function PlanningPage() {
    // Date range state (default: 2 weeks starting from this Monday)
    const [startDate, setStartDate] = useState(() => {
        const today = new Date();
        return startOfWeek(today, { weekStartsOn: 1 }); // Monday
    });
    const [endDate, setEndDate] = useState(() => addDays(startDate, 13)); // 2 weeks

    // Filters state
    const [filters, setFilters] = useState<PlanningFiltersType>({
        search: '',
        statuses: [],
    });

    // Modal state
    const [selectedReservationId, setSelectedReservationId] = useState<string | null>(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    // Create reservation modal state
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedUnit, setSelectedUnit] = useState<PlanningUnit | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    // Fetch planning data
    const { data, isLoading, error } = usePlanningData({
        startDate: format(startDate, 'yyyy-MM-dd'),
        endDate: format(endDate, 'yyyy-MM-dd'),
        siteId: filters.siteId,
        zoneId: filters.zoneId,
        unitTypeId: filters.unitTypeId,
    });

    // Fetch reservation details when modal is open
    const { data: reservationDetails, isLoading: isLoadingDetails } = useQuery({
        queryKey: ['reservation', selectedReservationId],
        queryFn: () => reservationsApi.getReservationById(selectedReservationId!),
        enabled: !!selectedReservationId && isDetailsModalOpen,
    });

    // Filter units based on search and status
    const filteredUnits = useMemo(() => {
        if (!data?.units) return [];

        let units = data.units;

        // Search filter
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            units = units.filter((unit) =>
                unit.name.toLowerCase().includes(searchLower) ||
                unit.zone.name.toLowerCase().includes(searchLower) ||
                unit.unitType.name.toLowerCase().includes(searchLower)
            );
        }

        // Status filter
        if (filters.statuses && filters.statuses.length > 0) {
            units = units.filter((unit) =>
                unit.reservations.some((res) => filters.statuses?.includes(res.status))
            );
        }

        return units;
    }, [data?.units, filters.search, filters.statuses]);

    const handleDateRangeChange = (newStartDate: Date, newEndDate: Date) => {
        setStartDate(newStartDate);
        setEndDate(newEndDate);
    };

    const handleReservationClick = (reservationId: string) => {
        setSelectedReservationId(reservationId);
        setIsDetailsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsDetailsModalOpen(false);
        setSelectedReservationId(null);
    };

    const handleEmptyCellClick = (unitId: string, date: Date) => {
        const unit = filteredUnits.find(u => u.id === unitId);
        if (unit) {
            setSelectedUnit(unit);
            setSelectedDate(date);
            setIsCreateModalOpen(true);
        }
    };

    const queryClient = useQueryClient();

    const createReservationMutation = useMutation({
        mutationFn: (data: CreateReservationData) => reservationsApi.createReservation(data),
        onSuccess: () => {
            // Invalidate planning query to refresh the grid
            queryClient.invalidateQueries({ queryKey: ['planning'] });
            setIsCreateModalOpen(false);
            setSelectedUnit(null);
            setSelectedDate(null);
        },
        onError: (error) => {
            console.error('Error creating reservation:', error);
            throw error;
        },
    });

    const handleCreateReservation = async (data: CreateReservationData) => {
        await createReservationMutation.mutateAsync(data);
    };

    const updateReservationMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateReservationData }) =>
            reservationsApi.updateReservation(id, data),
        onSuccess: () => {
            // Invalidate both planning and reservation queries to refresh
            queryClient.invalidateQueries({ queryKey: ['planning'] });
            queryClient.invalidateQueries({ queryKey: ['reservation', selectedReservationId] });
        },
        onError: (error) => {
            console.error('Error updating reservation:', error);
            throw error;
        },
    });

    const handleUpdateReservation = async (id: string, data: UpdateReservationData) => {
        await updateReservationMutation.mutateAsync({ id, data });
    };

    return (
        <div className="h-full flex flex-col p-6 gap-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">Planning Grid</h1>
                <p className="text-text-secondary">
                    Manage your campsite reservations with a visual timeline
                </p>
            </div>

            {/* Date Navigator */}
            <DateNavigator
                startDate={startDate}
                endDate={endDate}
                onDateRangeChange={handleDateRangeChange}
            />

            {/* Main Content */}
            <div className="flex-1 flex gap-6 overflow-hidden">
                {/* Filters Sidebar */}
                <div className="w-64 flex-shrink-0">
                    <PlanningFilters filters={filters} onFiltersChange={setFilters} />
                </div>

                {/* Planning Grid */}
                <div className="flex-1 overflow-hidden">
                    {isLoading ? (
                        <div className="h-full flex items-center justify-center bg-surface rounded-card shadow-card">
                            <div className="text-center">
                                <Loader2 className="w-8 h-8 animate-spin text-upcamp-cyan mx-auto mb-2" />
                                <p className="text-text-secondary">Loading planning data...</p>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="h-full flex items-center justify-center bg-surface rounded-card shadow-card">
                            <div className="text-center text-red-600">
                                <p className="font-medium mb-2">Error loading planning data</p>
                                <p className="text-sm">{error.message}</p>
                            </div>
                        </div>
                    ) : (
                        <PlanningGrid
                            units={filteredUnits}
                            startDate={startDate}
                            endDate={endDate}
                            onReservationClick={handleReservationClick}
                            onEmptyCellClick={handleEmptyCellClick}
                        />
                    )}
                </div>
            </div>

            {/* Reservation Details Modal */}
            <ReservationDetailsModal
                isOpen={isDetailsModalOpen}
                reservationId={selectedReservationId}
                reservationData={reservationDetails}
                isLoading={isLoadingDetails}
                onClose={handleCloseModal}
                onUpdate={handleUpdateReservation}
            />

            {/* Create Reservation Modal */}
            <CreateReservationModal
                isOpen={isCreateModalOpen}
                unit={selectedUnit}
                initialDate={selectedDate}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleCreateReservation}
            />
        </div>
    );
}

