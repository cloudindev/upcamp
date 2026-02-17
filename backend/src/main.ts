import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Global prefix
    app.setGlobalPrefix('api');

    // CORS
    app.enableCors({
        origin: process.env.CORS_ORIGIN?.split(',') || '*',
        credentials: true,
    });

    // Global validation pipe
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    // Swagger API Documentation
    const config = new DocumentBuilder()
        .setTitle('UPCAMP Hospitality API')
        .setDescription('Multi-tenant SaaS PMS for Campings')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('auth', 'Authentication & Authorization')
        .addTag('tenants', 'Tenant Management')
        .addTag('users', 'User Management')
        .addTag('inventory', 'Inventory (Sites, Zones, Units)')
        .addTag('reservations', 'Reservations')
        .addTag('guests', 'Guest Management')
        .addTag('financial', 'Financial (Folios, Charges, Payments)')
        .addTag('invoices', 'Invoicing')
        .addTag('checkin', 'Check-in & SES')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    const port = process.env.PORT || 3000;
    await app.listen(port);

    console.log(`🚀 Application is running on: http://localhost:${port}`);
    console.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
}

bootstrap();
