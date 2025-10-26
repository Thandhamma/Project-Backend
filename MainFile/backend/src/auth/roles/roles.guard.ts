// src/auth/roles.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. ดึง 'roles' ที่เรากำหนดไว้หน้า Endpoint ผ่าน @Roles() decorator
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // ถ้า Endpoint ไม่ได้กำหนด @Roles() ไว้ ก็ให้ผ่านได้เลย
    if (!requiredRoles) {
      return true;
    }

    // 2. ดึงข้อมูล user ที่ได้จาก JwtStrategy (ซึ่งถูกแนบมากับ req)
    const { user } = context.switchToHttp().getRequest();

    // 3. ตรวจสอบว่า role ของ user ตรงกับ role ที่ Endpoint ต้องการหรือไม่
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
