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

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // ✅ Register User
  async register(username: string, email: string, password: string) {
    const existingUserByEmail =
      await this.userService.findByUsernameOrEmail(email);
    if (existingUserByEmail) {
      throw new ConflictException('Email already exists');
    }

    const existingUserByUsername =
      await this.userService.findByUsernameOrEmail(username);
    if (existingUserByUsername) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userService.create({
      username,
      email,
      password: hashedPassword,
      role: 'user', // กำหนด role ที่นี่
    });

    // ส่งกลับข้อมูลที่ไม่มี password
    const { _id } = newUser;
    return { message: 'User registered successfully', userId: _id };
  }

  // ✅ Login User
  async login(password: string, email?: string, username?: string) {
    const identifier = email || username;
    if (!identifier) {
      throw new UnauthorizedException('Please provide email or username');
    }

    const user = await this.userService.findByUsernameOrEmail(identifier);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user._id, username: user.username, role: user.role };
    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      user: { id: user._id, username: user.username, email: user.email },
    };
  }
}
