import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class ReservationsService {
    constructor(private prisma: PrismaService) { }

    async findAll(tenantId: string) {
        return this.prisma.reservation.findMany({
            where: { tenantId },
            include: {
                unit: {
                    include: {
                        unitType: true,
                        zone: true,
                    },
                },
                guest: true,
            },
            orderBy: { checkInDate: 'desc' },
        });
    }

    async findOne(id: string, tenantId: string) {
        return this.prisma.reservation.findFirst({
            where: { id, tenantId },
            include: {
                unit: {
                    include: {
                        unitType: true,
                        zone: true,
                    },
                },
                guest: true,
                folio: {
                    include: {
                        charges: true,
                        payments: true,
                    },
                },
                checkIn: true,
            },
        });
    }

    async create(data: any, tenantId: string) {
        return this.prisma.reservation.create({
            data: {
                ...data,
                tenantId,
            },
        });
    }

    async update(id: string, data: any, tenantId: string) {
        return this.prisma.reservation.update({
            where: { id },
            data,
        });
    }
}
