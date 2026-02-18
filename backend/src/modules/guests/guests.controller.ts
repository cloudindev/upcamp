import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { GuestsService } from './guests.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../../core/auth/guards/jwt-auth.guard';

@Controller('guests')
@UseGuards(JwtAuthGuard)
export class GuestsController {
    constructor(private readonly guestsService: GuestsService) { }

    @Post()
    create(@Request() req, @Body() data: Prisma.GuestCreateInput) {
        const tenantId = req.user.tenantId;
        return this.guestsService.create({
            ...data,
            tenant: { connect: { id: tenantId } },
        });
    }

    @Get()
    findAll(@Request() req, @Query('search') search: string) {
        const tenantId = req.user.tenantId;
        const where: Prisma.GuestWhereInput = {
            tenantId,
        };

        if (search) {
            where.OR = [
                { firstName: { contains: search, mode: 'insensitive' } },
                { lastName: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { phone: { contains: search, mode: 'insensitive' } },
                { documentNumber: { contains: search, mode: 'insensitive' } },
            ];
        }

        return this.guestsService.findAll({
            where,
            orderBy: { createdAt: 'desc' },
        });
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.guestsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() data: Prisma.GuestUpdateInput) {
        return this.guestsService.update({
            where: { id },
            data,
        });
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.guestsService.remove({ id });
    }
}
