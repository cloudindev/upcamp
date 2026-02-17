import { PlanningUnit } from '../../types/planning.types';
import { eachDayOfInterval, format, isSameDay } from 'date-fns';
import ReservationBlock from './ReservationBlock';

interface PlanningGridProps {
    units: PlanningUnit[];
    startDate: Date;
    endDate: Date;
    onReservationClick?: (reservationId: string) => void;
    onEmptyCellClick?: (unitId: string, date: Date) => void;
}

const COLUMN_WIDTH = 80; // pixels per day
const ROW_HEIGHT = 60; // pixels per unit row

export default function PlanningGrid({
    units,
    startDate,
    endDate,
    onReservationClick,
    onEmptyCellClick,
}: PlanningGridProps) {
    const dates = eachDayOfInterval({ start: startDate, end: endDate });
    const today = new Date();

    return (
        <div className="bg-surface rounded-card shadow-card overflow-hidden">
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full">
                    {/* Header Row - Dates */}
                    <div className="sticky top-0 z-20 bg-surface-variant border-b-2 border-outline">
                        <div className="flex">
                            {/* Unit column header */}
                            <div
                                className="sticky left-0 z-30 bg-surface-variant border-r-2 border-outline px-4 py-3 font-medium text-text-primary"
                                style={{ width: '200px' }}
                            >
                                Unit
                            </div>
                            {/* Date columns */}
                            {dates.map((date) => {
                                const isToday = isSameDay(date, today);
                                return (
                                    <div
                                        key={date.toISOString()}
                                        className={`px-2 py-3 text-center border-r border-outline ${isToday ? 'bg-upcamp-cyan bg-opacity-10' : ''
                                            }`}
                                        style={{ width: `${COLUMN_WIDTH}px` }}
                                    >
                                        <div className="text-xs text-text-secondary">
                                            {format(date, 'EEE')}
                                        </div>
                                        <div className={`text-sm font-medium ${isToday ? 'text-upcamp-cyan' : 'text-text-primary'}`}>
                                            {format(date, 'd')}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Unit Rows */}
                    <div>
                        {units.length === 0 ? (
                            <div className="text-center py-12 text-text-secondary">
                                No units found. Try adjusting your filters.
                            </div>
                        ) : (
                            units.map((unit) => (
                                <div
                                    key={unit.id}
                                    className="flex border-b border-outline hover:bg-surface-variant transition-colors"
                                    style={{ height: `${ROW_HEIGHT}px` }}
                                >
                                    {/* Unit info column */}
                                    <div
                                        className="sticky left-0 z-10 bg-surface border-r border-outline px-4 py-3 flex flex-col justify-center"
                                        style={{ width: '200px' }}
                                    >
                                        <div className="font-medium text-text-primary">
                                            {unit.name}
                                        </div>
                                        <div className="text-xs text-text-secondary">
                                            {unit.unitType.name} · {unit.zone.name}
                                        </div>
                                    </div>

                                    {/* Reservation timeline */}
                                    <div
                                        className="relative flex-1"
                                        style={{ width: `${dates.length * COLUMN_WIDTH}px` }}
                                    >
                                        {/* Date grid lines */}
                                        {dates.map((date, index) => {
                                            const isToday = isSameDay(date, today);
                                            return (
                                                <div
                                                    key={date.toISOString()}
                                                    className={`absolute top-0 bottom-0 border-r border-outline cursor-pointer transition-colors hover:bg-upcamp-cyan hover:bg-opacity-10 ${isToday ? 'bg-upcamp-cyan bg-opacity-5' : ''
                                                        }`}
                                                    style={{
                                                        left: `${index * COLUMN_WIDTH}px`,
                                                        width: `${COLUMN_WIDTH}px`,
                                                    }}
                                                    onClick={() => onEmptyCellClick?.(unit.id, date)}
                                                    title="Click to create reservation"
                                                />
                                            );
                                        })}

                                        {/* Reservation blocks */}
                                        {unit.reservations.map((reservation) => (
                                            <ReservationBlock
                                                key={reservation.id}
                                                reservation={reservation}
                                                startDate={startDate}
                                                columnWidth={COLUMN_WIDTH}
                                                onClick={() => onReservationClick?.(reservation.id)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
