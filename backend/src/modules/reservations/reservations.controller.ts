import { Controller, Get, Post, Put, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../core/auth/guards/jwt-auth.guard';
import { ReservationsService } from './reservations.service';

@ApiTags('reservations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reservations')
export class ReservationsController {
    constructor(private reservationsService: ReservationsService) { }

    @Get()
    @ApiOperation({ summary: 'Get all reservations' })
    async findAll(@Request() req) {
        return this.reservationsService.findAll(req.user.tenantId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get reservation by ID' })
    async findOne(@Param('id') id: string, @Request() req) {
        return this.reservationsService.findOne(id, req.user.tenantId);
    }

    @Post()
    @ApiOperation({ summary: 'Create new reservation' })
    async create(@Body() data: any, @Request() req) {
        return this.reservationsService.create(data, req.user.tenantId);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update reservation' })
    async update(@Param('id') id: string, @Body() data: any, @Request() req) {
        return this.reservationsService.update(id, data, req.user.tenantId);
    }
}
