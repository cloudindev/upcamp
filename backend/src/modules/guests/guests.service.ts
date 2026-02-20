import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { Prisma, Guest } from '@prisma/client';

@Injectable()
export class GuestsService {
    constructor(private prisma: PrismaService) { }

    async create(data: Prisma.GuestCreateInput): Promise<Guest> {
        return this.prisma.guest.create({
            data,
            include: {
                billing: true,
                companions: true,
                vehicles: true,
                documents: true,
                loans: true,
            },
        });
    }

    async findAll(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.GuestWhereUniqueInput;
        where?: Prisma.GuestWhereInput;
        orderBy?: Prisma.GuestOrderByWithRelationInput;
    }): Promise<Guest[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.guest.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include: {
                billing: true,
                companions: true,
                vehicles: true,
                documents: true,
                loans: true,
            },
        });
    }

    async findOne(id: string): Promise<Guest | null> {
        return this.prisma.guest.findUnique({
            where: { id },
            include: {
                billing: true,
                companions: true,
                vehicles: true,
                documents: true,
                loans: true,
            },
        });
    }

    async update(params: {
        where: Prisma.GuestWhereUniqueInput;
        data: Prisma.GuestUpdateInput;
    }): Promise<Guest> {
        const { where, data } = params;
        return this.prisma.guest.update({
            data,
            where,
            include: {
                billing: true,
                companions: true,
                vehicles: true,
                documents: true,
                loans: true,
            },
        });
    }

    async remove(where: Prisma.GuestWhereUniqueInput): Promise<Guest> {
        return this.prisma.guest.delete({
            where,
        });
    }
}
