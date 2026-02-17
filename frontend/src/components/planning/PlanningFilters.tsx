import { Search, Filter } from 'lucide-react';
import { PlanningFilters, ReservationStatus } from '../../types/planning.types';

interface PlanningFiltersProps {
    filters: PlanningFilters;
    onFiltersChange: (filters: PlanningFilters) => void;
}

const statusOptions: { value: ReservationStatus; label: string; color: string }[] = [
    { value: 'pending', label: 'Pending', color: 'bg-amber-100 text-amber-800' },
    { value: 'confirmed', label: 'Confirmed', color: 'bg-green-100 text-green-800' },
    { value: 'checked_in', label: 'Checked In', color: 'bg-cyan-100 text-cyan-800' },
    { value: 'checked_out', label: 'Checked Out', color: 'bg-gray-100 text-gray-800' },
];

export default function PlanningFiltersComponent({ filters, onFiltersChange }: PlanningFiltersProps) {

    const handleSearchChange = (search: string) => {
        onFiltersChange({ ...filters, search });
    };

    const handleStatusToggle = (status: ReservationStatus) => {
        const currentStatuses = filters.statuses || [];
        const newStatuses = currentStatuses.includes(status)
            ? currentStatuses.filter(s => s !== status)
            : [...currentStatuses, status];
        onFiltersChange({ ...filters, statuses: newStatuses });
    };

    const clearFilters = () => {
        onFiltersChange({
            search: '',
            statuses: [],
        });
    };

    const hasActiveFilters = filters.search || (filters.statuses && filters.statuses.length > 0);

    return (
        <div className="bg-surface rounded-card shadow-card p-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-text-secondary" />
                    <h3 className="font-medium text-text-primary">Filters</h3>
                </div>
                {hasActiveFilters && (
                    <button
                        onClick={clearFilters}
                        className="text-sm text-upcamp-cyan hover:text-upcamp-cyan-hover"
                    >
                        Clear all
                    </button>
                )}
            </div>

            {/* Search */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-text-secondary mb-2">
                    Search Units
                </label>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input
                        type="text"
                        placeholder="Unit name or number..."
                        value={filters.search || ''}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="input pl-10"
                    />
                </div>
            </div>

            {/* Status Filters */}
            <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                    Reservation Status
                </label>
                <div className="space-y-2">
                    {statusOptions.map((option) => {
                        const isSelected = filters.statuses?.includes(option.value);
                        return (
                            <label
                                key={option.value}
                                className="flex items-center gap-2 cursor-pointer hover:bg-surface-variant p-2 rounded-button transition-colors"
                            >
                                <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => handleStatusToggle(option.value)}
                                    className="w-4 h-4 text-upcamp-cyan focus:ring-upcamp-cyan"
                                />
                                <span className={`badge ${option.color}`}>
                                    {option.label}
                                </span>
                            </label>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
