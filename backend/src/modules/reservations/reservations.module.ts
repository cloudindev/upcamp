import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { ReservationsStatsController } from './reservations-stats.controller';
import { ReservationsService } from './reservations.service';

@Module({
    controllers: [ReservationsController, ReservationsStatsController],
    providers: [ReservationsService],
    exports: [ReservationsService],
})
export class ReservationsModule { }
