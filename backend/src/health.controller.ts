
import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './core/database/prisma.service';

@Controller('health')
export class HealthController {
    constructor(private prisma: PrismaService) { }

    @Get()
    async check() {
        try {
            // Simple query to check database connection
            const userCount = await this.prisma.user.count();
            return {
                status: 'ok',
                database: 'connected',
                userCount: userCount,
                timestamp: new Date().toISOString(),
            };
        } catch (error) {
            console.error('Health check failed:', error);
            return {
                status: 'error',
                database: 'disconnected',
                error: error.message,
                timestamp: new Date().toISOString(),
            };
        }
    }
}
