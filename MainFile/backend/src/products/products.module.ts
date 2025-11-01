import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './products.controller';
import { ProductsService } from './products.service';
import { Product, ProductSchema } from './schemas/product.schema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MulterModule.register({
      dest: './uploads', // 📁 ที่จะเก็บรูป
    }),
  ],
  controllers: [ProductController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
