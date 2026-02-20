import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                const secret = config.get('JWT_SECRET') || process.env.JWT_SECRET || 'super-secret-fallback-key-FIX-ME';
                if (!config.get('JWT_SECRET') && !process.env.JWT_SECRET) {
                    console.warn('[AuthModule] WARNING: JWT_SECRET not found. Using fallback.');
                }
                return {
                    secret: secret,
                    signOptions: {
                        expiresIn: config.get('JWT_EXPIRES_IN', '1d'),
                    },
                };
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, LocalStrategy],
    exports: [AuthService],
})
export class AuthModule { }
