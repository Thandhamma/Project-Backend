import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

// เราควรสร้าง DTO (Data Transfer Object) เพื่อกำหนดโครงสร้างข้อมูล
// สร้างไฟล์ src/user/dto/create-user.dto.ts แล้วใส่ class นี้เข้าไป
export class CreateUserDto {
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
  async findByEmail(email: string): Promise<UserDocument | null> {
    // ใช้ .select('+password') เพื่อให้แน่ใจว่า field password จะถูกดึงมาด้วย
    // แม้ว่าใน schema จะตั้งค่า { select: false } ไว้ก็ตาม (เป็น good practice)
    return this.userModel.findOne({ email }).select('+password').exec();
  }
}
