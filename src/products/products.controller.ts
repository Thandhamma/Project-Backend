// src/product/product.controller.ts

import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Products') // จัดกลุ่ม API ใน Swagger
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt')) // สมมุติว่า route นี้ต้อง login
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorize. No token provided.' })
  @ApiBearerAuth() // แสดงว่า endpoint นี้ต้องการ Bearer token
  create(@Body() createProductDto: CreateProductDto) {
    // ถ้าข้อมูลที่ส่งมาไม่ตรงตามกฎใน CreateProductDto
    // NestJS จะโยน Error 400 Bad Request ให้โดยอัตโนมัติ
    // โค้ดของเราจะทำงานก็ต่อเมื่อข้อมูลถูกต้องแล้วเท่านั้น
    return this.productService.create(createProductDto);
  }
}
