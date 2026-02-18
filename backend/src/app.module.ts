import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

// Core modules
import { DatabaseModule } from './core/database/database.module';
import { AuthModule } from './core/auth/auth.module';
import { TenancyModule } from './core/tenancy/tenancy.module';
import { SeedService } from './core/database/seed.service';

// Domain modules
import { TenantsModule } from './modules/tenants/tenants.module';
import { UsersModule } from './modules/users/users.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { GuestsModule } from './modules/guests/guests.module';
import { FinancialModule } from './modules/financial/financial.module';
import { CheckInModule } from './modules/checkin/checkin.module';
import { PlanningModule } from './modules/planning/planning.module';

import { HealthController } from './health.controller';

@Module({
    imports: [
        // Configuration
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '../.env',
        }),

        // Rate limiting
        ThrottlerModule.forRoot([
            {
                ttl: 60000, // 1 minute
                limit: 100, // 100 requests per minute
            },
        ]),

        // Core
        DatabaseModule,
        AuthModule,
        TenancyModule,

        // Domain modules
        TenantsModule,
        UsersModule,
        InventoryModule,
        ReservationsModule,
        GuestsModule,
        FinancialModule,
        CheckInModule,
        PlanningModule,
    ],
    controllers: [HealthController],
})
export class AppModule implements OnModuleInit {
    constructor(private readonly seedService: SeedService) { }

    async onModuleInit() {
        await this.seedService.seed();
    }
}
