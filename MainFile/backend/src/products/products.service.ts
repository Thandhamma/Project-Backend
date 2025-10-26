import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async findAll() {
    return this.productModel.find().lean();
  }

  async findOne(id: string) {
    return this.productModel.findById(id).lean();
  }

  async create(dto: Partial<Product>) {
    return this.productModel.create(dto);
  }

  async update(id: string, dto: Partial<Product>) {
    return this.productModel.findByIdAndUpdate(id, dto, { new: true }).lean();
  }

  async remove(id: string) {
    return this.productModel.findByIdAndDelete(id).lean();
  }
}
