// src/profile/profile.controller.ts

import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';

@Controller('profile')
// ใช้ AuthGuard('jwt') เพื่อตรวจสอบ Token ก่อน
// แล้วตามด้วย RolesGuard เพื่อตรวจสอบ Role
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ProfileController {
  // ✅ Route นี้สำหรับ user ทั่วไปและ admin
  @Get('me')
  @Roles('user', 'admin') // 👈 ระบุว่าต้องการ role 'user' หรือ 'admin'
  getProfile(@Request() req) {
    return {
      message: 'This is your user profile.',
      user: req.user, // ข้อมูล user ที่ได้จาก JwtStrategy
      username: req.user.username,
      role: req.user.role,
      email: req.user.email,
    };
  }

  // 🔑 Route นี้สำหรับ Admin เท่านั้น
  @Get('dashboard')
  @Roles('admin') // 👈 ระบุว่าต้องการ role 'admin' เท่านั้น
  getAdminDashboard(@Request() req) {
    return {
      message: 'Welcome to the Admin Dashboard!',
      adminUser: req.user,
    };
  }
}
