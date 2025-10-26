// src/auth/auth.service.ts

import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
// แก้ไข import ให้ถูกต้อง
import { UserService } from '../user/user.service';
import { UserDocument } from 'src/user/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // ✅ Register User
  async register(email: string, password: string) {
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // ⭐ ปรับตรงนี้ให้ส่งเป็น object ที่ตรงกับ DTO ที่เราสร้าง
    const newUser = await this.userService.create({
      email,
      password: hashedPassword,
      role: 'user', // กำหนด role ที่นี่
    });

    // ส่งกลับข้อมูลที่ไม่มี password
    const { _id } = newUser;
    return { message: 'User registered successfully', userId: _id };
  }

  // ✅ Login User
  async login(email: string, password: string) {
    // โค้ดส่วนนี้ถูกต้องแล้ว ไม่ต้องแก้ไข
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: user._id, email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload);

    return { access_token: token };
  }
}
