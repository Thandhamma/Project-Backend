// orders.controller.ts
import { Body, Controller, Post, Get } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.schema';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    console.log('📦 Creating order:', createOrderDto);
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  async getAllOrders(): Promise<Order[]> {
    return this.ordersService.findAll();
  }
}
