import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { PlanningQueryDto } from './dto/planning-query.dto';

@Injectable()
export class PlanningService {
    constructor(private readonly prisma: PrismaService) { }

    async getPlanningData(tenantId: string, query: PlanningQueryDto) {
        const { startDate, endDate, siteId, zoneId, unitTypeId } = query;

        // Build where clause for units
        const unitWhere: any = {
            tenantId,
        };

        if (zoneId) {
            unitWhere.zoneId = zoneId;
        } else if (siteId) {
            unitWhere.zone = {
                siteId,
            };
        }

        if (unitTypeId) {
            unitWhere.unitTypeId = unitTypeId;
        }

        // Fetch units with their reservations in the date range
        const units = await this.prisma.unit.findMany({
            where: unitWhere,
            include: {
                zone: {
                    select: {
                        id: true,
                        name: true,
                        siteId: true,
                    },
                },
                unitType: {
                    select: {
                        id: true,
                        name: true,
                        category: true,
                        maxOccupancy: true,
                    },
                },
                reservations: {
                    where: {
                        // Get reservations that overlap with the date range
                        AND: [
                            {
                                checkInDate: {
                                    lte: new Date(endDate),
                                },
                            },
                            {
                                checkOutDate: {
                                    gte: new Date(startDate),
                                },
                            },
                        ],
                        status: {
                            notIn: ['cancelled'], // Exclude cancelled reservations
                        },
                    },
                    include: {
                        guest: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                email: true,
                                phone: true,
                            },
                        },
                    },
                    orderBy: {
                        checkInDate: 'asc',
                    },
                },
            },
            orderBy: [
                {
                    zone: {
                        sortOrder: 'asc',
                    },
                },
                {
                    name: 'asc',
                },
            ],
        });

        // Format the response
        return {
            dateRange: {
                startDate,
                endDate,
            },
            units: units.map((unit) => ({
                id: unit.id,
                name: unit.name,
                status: unit.status,
                zone: {
                    id: unit.zone.id,
                    name: unit.zone.name,
                },
                unitType: {
                    id: unit.unitType.id,
                    name: unit.unitType.name,
                    category: unit.unitType.category,
                    maxOccupancy: unit.unitType.maxOccupancy,
                },
                reservations: unit.reservations.map((reservation) => ({
                    id: reservation.id,
                    checkInDate: reservation.checkInDate,
                    checkOutDate: reservation.checkOutDate,
                    nights: reservation.nights,
                    status: reservation.status,
                    adults: reservation.adults,
                    children: reservation.children,
                    totalAmount: reservation.totalAmount,
                    paidAmount: reservation.paidAmount,
                    guest: {
                        id: reservation.guest.id,
                        name: `${reservation.guest.firstName} ${reservation.guest.lastName}`,
                        email: reservation.guest.email,
                        phone: reservation.guest.phone,
                    },
                    notes: reservation.notes,
                })),
            })),
        };
    }
}
