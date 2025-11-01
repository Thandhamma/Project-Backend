import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../user/user.schema'; // Import User schema

// หน้าตาของสินค้า 1 ชิ้นในตะกร้า
@Schema({ _id: false }) // บอกว่าไม่ต้องมี _id ของตัวเอง
export class OrderItem {
  @Prop({ required: true })
  productId: string; // เราเก็บแค่ ID ของ Product

  @Prop({ required: true })
  name: string; // (เก็บชื่อมาเลย จะได้ไม่ต้องไป join ตารางทีหลัง)

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number; // ราคาต่อชิ้น (ตอนที่ซื้อ)
}
export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

// หน้าตาของที่อยู่จัดส่ง
@Schema({ _id: false })
export class ShippingAddress {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  addressLine1: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  postalCode: string;

  @Prop({ required: true })
  phone: string;
}
export const ShippingAddressSchema =
  SchemaFactory.createForClass(ShippingAddress);

// --- 1.2 นี่คือ "Order" หลัก ---
@Schema({ timestamps: true }) // ให้มันสร้าง createdAt, updatedAt อัตโนมัติ
export class Order {
  // 1.3 ลิงก์ไปหา User ที่สั่ง
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User; // หรือ user: string; ก็ได้ถ้าเก็บแค่ ID

  // 1.4 เก็บ "ที่อยู่" เป็น Object
  @Prop({ type: ShippingAddressSchema, required: true })
  shippingAddress: ShippingAddress;

  // 1.5 เก็บ "รายการสินค้า" เป็น Array
  @Prop({ type: [OrderItemSchema], required: true })
  items: OrderItem[];

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ default: 'pending' }) // สถานะเริ่มต้น
  status: 'pending' | 'processing' | 'shipped' | 'cancelled';
}

export const OrderSchema = SchemaFactory.createForClass(Order);
