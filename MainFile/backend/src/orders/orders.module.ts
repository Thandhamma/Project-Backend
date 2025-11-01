import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './order.schema';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { AuthModule } from 'src/auth/auth.module'; // 1. Import AuthModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    AuthModule, // 2. Import ที่นี่ (เพื่อให้เราใช้ JwtAuthGuard ได้)
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
