import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

// เราควรสร้าง DTO (Data Transfer Object) เพื่อกำหนดโครงสร้างข้อมูล
// สร้างไฟล์ src/user/dto/create-user.dto.ts แล้วใส่ class นี้เข้าไป
export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**
   * สร้าง User ใหม่ในระบบ
   * @param createUserDto ข้อมูลสำหรับสร้าง user
   * @returns Document ของ User ที่ถูกสร้าง
   */
  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  /**
   * ค้นหา User ด้วยอีเมล
   * @param email อีเมลที่ต้องการค้นหา
   * @returns Document ของ User ที่เจอ หรือ null
   */
  async findByUsernameOrEmail(
    identifier: string,
  ): Promise<UserDocument | null> {
    // ตรวจสอบว่าสิ่งที่ส่งมาเป็น Email หรือไม่
    const isEmail = identifier.includes('@');

    const query = isEmail ? { email: identifier } : { username: identifier };

    return this.userModel.findOne(query).select('+password').exec();
  }
}
