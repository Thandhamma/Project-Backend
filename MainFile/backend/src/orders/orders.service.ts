// orders.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './order.schema';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const newOrder = new this.orderModel(createOrderDto);
    return newOrder.save(); // ✅ บันทึกจริงลง MongoDB
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }
}
