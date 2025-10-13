// src/product/dto/create-product.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Sample Product',
    description: 'Name of the product',
  })
  // ใช้ ApiProperty เพื่อเพิ่มรายละเอียดใน Swagger
  @IsString({ message: 'Product name must be a string.' })
  @IsNotEmpty({ message: 'Product name should not be empty.' })
  name: string;

  @ApiProperty({
    example: 99.99,
    description: 'Price of the product',
  })
  // ใช้ ApiProperty เพื่อเพิ่มรายละเอียดใน Swagger
  @IsNumber({}, { message: 'Price must be a number.' })
  @IsPositive({ message: 'Price must be a positive number.' }) // ราคาควรเป็นค่าบวก
  @IsNotEmpty({ message: 'Price should not be empty.' })
  price: number;

  @IsString()
  @IsOptional() // field นี้ไม่จำเป็นต้องส่งมาก็ได้
  image?: string; // image อาจเป็น URL

  @IsString()
  @IsOptional() // field นี้ไม่จำเป็นต้องส่งมาก็ได้
  description?: string;
}
