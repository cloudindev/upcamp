import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ReservationsService } from './reservations.service';
import { JwtAuthGuard } from '../../core/auth/guards/jwt-auth.guard';

@ApiTags('reservations')
@Controller('reservations')
export class ReservationsStatsController {
    constructor(private reservationsService: ReservationsService) { }

    @Get('stats/dashboard')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get dashboard statistics' })
    async getDashboardStats(@Request() req) {
        const tenantId = req.user?.tenantId || 'demo-tenant-id';

        // Get all reservations for the tenant
        const reservations = await this.reservationsService.findAll(tenantId);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Calculate arrivals today
        const arrivalsToday = reservations.filter(r => {
            const checkIn = new Date(r.checkInDate);
            return checkIn >= today && checkIn < tomorrow;
        }).length;

        // Calculate current occupancy (simplified)
        const activeReservations = reservations.filter(r => {
            const checkIn = new Date(r.checkInDate);
            const checkOut = new Date(r.checkOutDate);
            return checkIn <= today && checkOut > today && r.status === 'confirmed';
        }).length;

        // Assuming 16 total units (from seed data)
        const totalUnits = 16;
        const currentOccupancy = Math.round((activeReservations / totalUnits) * 100);

        // Calculate monthly revenue
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const monthlyRevenue = reservations
            .filter(r => new Date(r.createdAt) >= firstDayOfMonth)
            .reduce((sum, r) => sum + ((r as any).totalPrice || 0), 0);

        // Calculate weekly occupancy
        const weeklyOccupancy = this.calculateWeeklyOccupancy(reservations, totalUnits);

        return {
            totalBookings: reservations.length,
            currentOccupancy,
            arrivalsToday,
            monthlyRevenue,
            weeklyOccupancy,
        };
    }

    private calculateWeeklyOccupancy(reservations: any[], totalUnits: number) {
        const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
        const today = new Date();

        return days.map((day, index) => {
            const date = new Date(today);
            date.setDate(today.getDate() - today.getDay() + index + 1); // Start from Monday
            date.setHours(0, 0, 0, 0);

            const nextDay = new Date(date);
            nextDay.setDate(date.getDate() + 1);

            const occupiedUnits = reservations.filter(r => {
                const checkIn = new Date(r.checkInDate);
                const checkOut = new Date(r.checkOutDate);
                return checkIn <= date && checkOut > date && r.status === 'confirmed';
            }).length;

            return {
                day,
                percentage: Math.round((occupiedUnits / totalUnits) * 100),
            };
        });
    }
}
