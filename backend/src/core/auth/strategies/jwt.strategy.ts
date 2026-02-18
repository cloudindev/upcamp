import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        const secret = configService.get<string>('JWT_SECRET') || process.env.JWT_SECRET || 'super-secret-fallback-key-FIX-ME';

        if (!configService.get<string>('JWT_SECRET') && !process.env.JWT_SECRET) {
            console.warn('[JwtStrategy] WARNING: JWT_SECRET not found in env. Using fallback key.');
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret,
        });
    }

    async validate(payload: any) {
        return {
            userId: payload.sub,
            email: payload.email,
            tenantId: payload.tenantId,
            role: payload.role,
        };
    }
}
