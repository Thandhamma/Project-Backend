// src/product/dto/create-product.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
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
  @IsString({ message: 'Product name must be a string.' })
  @IsNotEmpty({ message: 'Product name should not be empty.' })
  name: string;

  @ApiProperty({
    example: 99.99,
    description: 'Price of the product',
  })
  @Type(() => Number) // แปลงค่าจาก string → number ตอนรับจาก request body
  @IsNumber({}, { message: 'Price must be a number.' })
  @IsPositive({ message: 'Price must be a positive number.' })
  @IsNotEmpty({ message: 'Price should not be empty.' })
  price: number;

  @ApiProperty({
    example: 'uploads/product-image.jpg',
    description: 'Path or URL of the product image',
    required: false,
  })
  @IsString({ message: 'Image path must be a string.' })
  @IsOptional()
  image?: string;

  @ApiProperty({
    example: 'This is a short description of the product.',
    description: 'Description of the product',
    required: false,
  })
  @IsString({ message: 'Description must be a string.' })
  @IsOptional()
  description?: string;
}
