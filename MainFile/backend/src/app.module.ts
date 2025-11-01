import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ProfileController } from './profile/profile.controller';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.MONGO_URI ??
        (() => {
          throw new Error('MONGO_URI environment variable is not defined');
        })(),
    ),
    OrdersModule,
    ProductsModule,
    AuthModule,
    UserModule,
  ],
  controllers: [ProfileController],
})
export class AppModule {}
