// src/auth/jwt.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

// Interface สำหรับ Payload ที่เราใส่ไว้ใน Token
export interface JwtPayload {
  sub: string; // User ID
  email: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      // บอกให้ Strategy ดึง Token จาก Authorization Header (รูปแบบ Bearer <token>)
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // ตรวจสอบวันหมดอายุของ Token
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'), // ใช้ Secret Key จาก .env
    });
  }

  /**
   * ฟังก์ชันนี้จะทำงานหลังจาก Token ถูกตรวจสอบ (verify) แล้วว่าถูกต้อง
   * ค่าที่ return จากฟังก์ชันนี้จะถูกนำไปใส่ใน Request object (req.user)
   */
  async validate(payload: JwtPayload) {
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
