import { IsEmail, IsString, IsOptional } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsOptional() // บอกว่า email นี้ อาจจะไม่มีก็ได้
  email?: string;

  @IsString()
  @IsOptional() // บอกว่า username นี้ อาจจะไม่มีก็ได้
  username?: string;

  @IsString()
  password: string;
}
