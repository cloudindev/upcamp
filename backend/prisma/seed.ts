import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Create a demo tenant
    const tenant = await prisma.tenant.upsert({
        where: { slug: 'demo-camping' },
        update: {},
        create: {
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

    console.log('✅ Tenant created:', tenant.name);

    // Create admin user
    const hashedPassword = await bcrypt.hash('password123', 10);

    const adminUser = await prisma.user.upsert({
        where: {
            tenantId_email: {
                tenantId: tenant.id,
                email: 'admin@camping.com'
            }
        },
        update: {},
        create: {
            tenantId: tenant.id,
            email: 'admin@camping.com',
            password: hashedPassword,
            firstName: 'Admin',
            lastName: 'User',
            role: 'admin',
            isActive: true,
        },
    });

    console.log('✅ Admin user created:', adminUser.email);
    console.log('   Password: password123');

    // Create a demo site
    const site = await prisma.site.create({
        data: {
            tenantId: tenant.id,
            name: 'Camping Principal',
            description: 'Área principal del camping',
            isActive: true,
        },
    });

    console.log('✅ Site created:', site.name);

    // Create zones
    const zone1 = await prisma.zone.create({
        data: {
            tenantId: tenant.id,
            siteId: site.id,
            name: 'Zona A - Parcelas',
            description: 'Parcelas estándar con electricidad',
            sortOrder: 1,
        },
    });

    const zone2 = await prisma.zone.create({
        data: {
            tenantId: tenant.id,
            siteId: site.id,
            name: 'Zona B - Bungalows',
            description: 'Bungalows de 4 personas',
            sortOrder: 2,
        },
    });

    console.log('✅ Zones created');

    // Create unit types
    const parcelaType = await prisma.unitType.create({
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

    const bungalowType = await prisma.unitType.create({
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

    console.log('✅ Unit types created');

    // Create some units
    const units = [];

    // Create 10 parcelas
    for (let i = 1; i <= 10; i++) {
        const unit = await prisma.unit.create({
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
        const unit = await prisma.unit.create({
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

    console.log(`✅ Created ${units.length} units`);

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
        const guest = await prisma.guest.create({
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

    console.log(`✅ Created ${guests.length} guests`);

    // Create reservations (spread across February 2026)
    const reservations = [
        // Week of Feb 9-15
        { unitIdx: 0, guestIdx: 0, checkIn: '2026-02-10', nights: 3, status: 'confirmed', adults: 2, children: 1 },
        { unitIdx: 1, guestIdx: 1, checkIn: '2026-02-12', nights: 5, status: 'confirmed', adults: 4, children: 2 },
        { unitIdx: 2, guestIdx: 2, checkIn: '2026-02-14', nights: 7, status: 'checked_in', adults: 2, children: 0 },
        { unitIdx: 10, guestIdx: 3, checkIn: '2026-02-11', nights: 6, status: 'confirmed', adults: 4, children: 0 },

        // Week of Feb 16-22
        { unitIdx: 3, guestIdx: 4, checkIn: '2026-02-15', nights: 4, status: 'pending', adults: 3, children: 1 },
        { unitIdx: 4, guestIdx: 5, checkIn: '2026-02-18', nights: 3, status: 'confirmed', adults: 2, children: 2 },
        { unitIdx: 11, guestIdx: 6, checkIn: '2026-02-16', nights: 4, status: 'confirmed', adults: 2, children: 1 },
        { unitIdx: 12, guestIdx: 7, checkIn: '2026-02-19', nights: 5, status: 'pending', adults: 3, children: 0 },

        // Late February
        { unitIdx: 5, guestIdx: 0, checkIn: '2026-02-22', nights: 7, status: 'confirmed', adults: 2, children: 0 },
        { unitIdx: 6, guestIdx: 1, checkIn: '2026-02-25', nights: 4, status: 'pending', adults: 4, children: 1 },
        { unitIdx: 13, guestIdx: 2, checkIn: '2026-02-23', nights: 5, status: 'confirmed', adults: 3, children: 1 },

        // Early March
        { unitIdx: 7, guestIdx: 3, checkIn: '2026-03-01', nights: 4, status: 'confirmed', adults: 2, children: 1 },
        { unitIdx: 8, guestIdx: 4, checkIn: '2026-03-05', nights: 7, status: 'pending', adults: 3, children: 2 },
    ];

    for (const res of reservations) {
        const checkInDate = new Date(res.checkIn);
        const checkOutDate = new Date(checkInDate);
        checkOutDate.setDate(checkOutDate.getDate() + res.nights);

        const unitType = units[res.unitIdx].unitTypeId === parcelaType.id ? 'parcela' : 'bungalow';
        const totalAmount = res.nights * (unitType === 'parcela' ? 35 : 85);
        const paidAmount = res.status === 'confirmed' || res.status === 'checked_in' ? totalAmount * 0.5 : 0;

        await prisma.reservation.create({
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

    console.log(`✅ Created ${reservations.length} reservations`);

    console.log('\n🎉 Seeding completed!');
    console.log('\n📝 Login credentials:');
    console.log('   Email: admin@camping.com');
    console.log('   Password: password123');
    console.log(`\n📊 Summary:`);
    console.log(`   - ${units.length} units (10 parcelas, 6 bungalows)`);
    console.log(`   - ${guests.length} guests`);
    console.log(`   - ${reservations.length} reservations`);
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
