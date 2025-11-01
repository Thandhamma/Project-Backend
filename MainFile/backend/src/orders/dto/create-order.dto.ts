import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNotEmptyObject,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

// 1. DTO สำหรับ "ที่อยู่"
class ShippingAddressDto {
  @IsString()
  fullName: string;

  @IsString()
  addressLine1: string;

  @IsString()
  city: string;

  @IsString()
  postalCode: string;

  @IsString()
  phone: string;
}

// 2. DTO สำหรับ "สินค้า 1 ชิ้น"
class OrderItemDto {
  @IsMongoId()
  productId: string;

  @IsString()
  name: string;

  @Type(() => Number)
  @IsNumber()
  quantity: number;

  @Type(() => Number)
  @IsNumber()
  price: number;
}

// 3. DTO สำหรับ "Order" หลัก
export class CreateOrderDto {
  @IsMongoId()
  user: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ShippingAddressDto)
  shippingAddress: ShippingAddressDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @Type(() => Number)
  @IsNumber()
  totalAmount: number;
}
