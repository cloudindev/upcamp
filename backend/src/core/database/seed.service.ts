import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
    private readonly logger = new Logger(SeedService.name);

    constructor(private readonly prisma: PrismaService) { }

    async seed() {
        try {
            // Check if database is already seeded
            const tenantCount = await this.prisma.tenant.count();
            if (tenantCount > 0) {
                this.logger.log('Database already seeded. Skipping...');
                return;
            }

            this.logger.log('🌱 Seeding database...');

            // Create a demo tenant
            const tenant = await this.prisma.tenant.create({
                data: {
                    name: 'Demo Camping',
                    slug: 'demo-camping',
                    email: 'info@democamping.com',
                    phone: '+34 123 456 789',
                    address: 'Calle Principal 123',
                    city: 'Valencia',
                    province: 'Valencia',
                    postalCode: '46001',
                    country: 'ES',
                    taxId: 'B12345678',
                    plan: 'pro',
                    status: 'active',
                },
            });

            this.logger.log(`✅ Tenant created: ${tenant.name}`);

            // Create admin user
            const hashedPassword = await bcrypt.hash('password123', 10);

            const adminUser = await this.prisma.user.create({
                data: {
                    tenantId: tenant.id,
                    email: 'admin@camping.com',
                    password: hashedPassword,
                    firstName: 'Admin',
                    lastName: 'User',
                    role: 'admin',
                    isActive: true,
                },
            });

            this.logger.log(`✅ Admin user created: ${adminUser.email}`);

            // Create a demo site
            const site = await this.prisma.site.create({
                data: {
                    tenantId: tenant.id,
                    name: 'Camping Principal',
                    description: 'Área principal del camping',
                    isActive: true,
                },
            });

            // Create zones
            const zone1 = await this.prisma.zone.create({
                data: {
                    tenantId: tenant.id,
                    siteId: site.id,
                    name: 'Zona A - Parcelas',
                    description: 'Parcelas estándar con electricidad',
                    sortOrder: 1,
                },
            });

            const zone2 = await this.prisma.zone.create({
                data: {
                    tenantId: tenant.id,
                    siteId: site.id,
                    name: 'Zona B - Bungalows',
                    description: 'Bungalows de 4 personas',
                    sortOrder: 2,
                },
            });

            // Create unit types
            const parcelaType = await this.prisma.unitType.create({
                data: {
                    tenantId: tenant.id,
                    name: 'Parcela Estándar',
                    category: 'plot',
                    maxOccupancy: 6,
                    basePrice: 35.00,
                    description: 'Parcela con electricidad y agua',
                    amenities: ['electricity', 'water', 'wifi'],
                },
            });

            const bungalowType = await this.prisma.unitType.create({
                data: {
                    tenantId: tenant.id,
                    name: 'Bungalow 4 pax',
                    category: 'bungalow',
                    maxOccupancy: 4,
                    basePrice: 85.00,
                    description: 'Bungalow equipado para 4 personas',
                    amenities: ['electricity', 'water', 'wifi', 'kitchen', 'bathroom', 'ac'],
                },
            });

            // Create units
            const units = [];

            // Create 10 parcelas
            for (let i = 1; i <= 10; i++) {
                const unit = await this.prisma.unit.create({
                    data: {
                        tenantId: tenant.id,
                        zoneId: zone1.id,
                        unitTypeId: parcelaType.id,
                        name: `P-${i.toString().padStart(3, '0')}`,
                        status: 'available',
                    },
                });
                units.push(unit);
            }

            // Create 6 bungalows
            for (let i = 1; i <= 6; i++) {
                const unit = await this.prisma.unit.create({
                    data: {
                        tenantId: tenant.id,
                        zoneId: zone2.id,
                        unitTypeId: bungalowType.id,
                        name: `B-${i.toString().padStart(2, '0')}`,
                        status: 'available',
                    },
                });
                units.push(unit);
            }

            this.logger.log(`✅ Created ${units.length} units`);

            // Create guests
            const guestData = [
                { firstName: 'Carlos', lastName: 'García López', email: 'carlos.garcia@email.com', phone: '+34 600 111 222', docNum: '12345678A' },
                { firstName: 'María', lastName: 'Martínez Ruiz', email: 'maria.martinez@email.com', phone: '+34 600 222 333', docNum: '23456789B' },
                { firstName: 'José', lastName: 'Rodríguez Pérez', email: 'jose.rodriguez@email.com', phone: '+34 600 333 444', docNum: '34567890C' },
                { firstName: 'Ana', lastName: 'Fernández Sánchez', email: 'ana.fernandez@email.com', phone: '+34 600 444 555', docNum: '45678901D' },
                { firstName: 'David', lastName: 'López González', email: 'david.lopez@email.com', phone: '+34 600 555 666', docNum: '56789012E' },
                { firstName: 'Laura', lastName: 'Hernández Díaz', email: 'laura.hernandez@email.com', phone: '+34 600 666 777', docNum: '67890123F' },
                { firstName: 'Miguel', lastName: 'González Moreno', email: 'miguel.gonzalez@email.com', phone: '+34 600 777 888', docNum: '78901234G' },
                { firstName: 'Carmen', lastName: 'Jiménez Álvarez', email: 'carmen.jimenez@email.com', phone: '+34 600 888 999', docNum: '89012345H' },
            ];

            const guests = [];
            for (const data of guestData) {
                const guest = await this.prisma.guest.create({
                    data: {
                        tenantId: tenant.id,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        phone: data.phone,
                        documentType: 'dni',
                        documentNumber: data.docNum,
                        nationality: 'ES',
                        country: 'ES',
                    },
                });
                guests.push(guest);
            }

            this.logger.log(`✅ Created ${guests.length} guests`);

            // Create reservations
            // Use dates relative to now to ensure they show up in current planning
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth(); // 0-indexed

            const reservations = [
                // Current week
                { unitIdx: 0, guestIdx: 0, daysFromNow: -1, nights: 3, status: 'confirmed', adults: 2, children: 1 },
                { unitIdx: 1, guestIdx: 1, daysFromNow: 1, nights: 5, status: 'confirmed', adults: 4, children: 2 },
                { unitIdx: 2, guestIdx: 2, daysFromNow: 0, nights: 7, status: 'checked_in', adults: 2, children: 0 },
                { unitIdx: 10, guestIdx: 3, daysFromNow: 2, nights: 6, status: 'confirmed', adults: 4, children: 0 },

                // Next week
                { unitIdx: 3, guestIdx: 4, daysFromNow: 5, nights: 4, status: 'pending', adults: 3, children: 1 },
                { unitIdx: 4, guestIdx: 5, daysFromNow: 8, nights: 3, status: 'confirmed', adults: 2, children: 2 },
                { unitIdx: 11, guestIdx: 6, daysFromNow: 6, nights: 4, status: 'confirmed', adults: 2, children: 1 },
                { unitIdx: 12, guestIdx: 7, daysFromNow: 9, nights: 5, status: 'pending', adults: 3, children: 0 },
            ];

            for (const res of reservations) {
                const checkInDate = new Date();
                checkInDate.setDate(today.getDate() + res.daysFromNow);
                checkInDate.setHours(14, 0, 0, 0);

                const checkOutDate = new Date(checkInDate);
                checkOutDate.setDate(checkOutDate.getDate() + res.nights);
                checkOutDate.setHours(11, 0, 0, 0);

                const unitType = units[res.unitIdx].unitTypeId === parcelaType.id ? 'parcela' : 'bungalow';
                const totalAmount = res.nights * (unitType === 'parcela' ? 35 : 85);
                const paidAmount = res.status === 'confirmed' || res.status === 'checked_in' ? totalAmount * 0.5 : 0;

                await this.prisma.reservation.create({
                    data: {
                        tenantId: tenant.id,
                        unitId: units[res.unitIdx].id,
                        guestId: guests[res.guestIdx].id,
                        checkInDate,
                        checkOutDate,
                        nights: res.nights,
                        status: res.status,
                        totalAmount,
                        paidAmount,
                        adults: res.adults,
                        children: res.children,
                        notes: res.status === 'pending' ? 'Pendiente de confirmación' : null,
                    },
                });
            }

            this.logger.log(`✅ Created ${reservations.length} reservations`);
            this.logger.log('🎉 Seeding completed!');

        } catch (error) {
            this.logger.error('❌ Error seeding database:', error);
            // Don't crash the app if seeding fails
        }
    }
}
