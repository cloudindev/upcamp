import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { format, addDays, addWeeks, startOfWeek } from 'date-fns';

interface DateNavigatorProps {
    startDate: Date;
    endDate: Date;
    onDateRangeChange: (startDate: Date, endDate: Date) => void;
}

export default function DateNavigator({ startDate, endDate, onDateRangeChange }: DateNavigatorProps) {
    const goToPreviousWeek = () => {
        const newStart = addWeeks(startDate, -1);
        const newEnd = addWeeks(endDate, -1);
        onDateRangeChange(newStart, newEnd);
    };

    const goToNextWeek = () => {
        const newStart = addWeeks(startDate, 1);
        const newEnd = addWeeks(endDate, 1);
        onDateRangeChange(newStart, newEnd);
    };

    const goToToday = () => {
        const today = new Date();
        const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // Monday
        const weekEnd = addDays(weekStart, 13); // 2 weeks
        onDateRangeChange(weekStart, weekEnd);
    };

    return (
        <div className="flex items-center gap-4 bg-surface p-4 rounded-card shadow-card">
            <button
                onClick={goToPreviousWeek}
                className="btn btn-outline p-2"
                aria-label="Previous week"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 flex-1 justify-center">
                <Calendar className="w-5 h-5 text-text-secondary" />
                <span className="font-medium text-text-primary">
                    {format(startDate, 'MMM d, yyyy')} - {format(endDate, 'MMM d, yyyy')}
                </span>
            </div>

            <button
                onClick={goToToday}
                className="btn btn-secondary px-4 py-2"
            >
                Today
            </button>

            <button
                onClick={goToNextWeek}
                className="btn btn-outline p-2"
                aria-label="Next week"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
}
