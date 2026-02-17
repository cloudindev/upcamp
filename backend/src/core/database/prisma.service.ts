import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        super({
            log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
        });
    }

    async onModuleInit() {
        await this.$connect();
        console.log('✅ Database connected');
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }

    /**
     * Set tenant context for Row Level Security
     */
    async setTenantContext(tenantId: string) {
        await this.$executeRaw`SET LOCAL app.current_tenant_id = ${tenantId}`;
    }

    /**
     * Execute within tenant context
     */
    async withTenant<T>(tenantId: string, callback: () => Promise<T>): Promise<T> {
        return this.$transaction(async (tx) => {
            await tx.$executeRaw`SET LOCAL app.current_tenant_id = ${tenantId}`;
            return callback();
        });
    }
}
