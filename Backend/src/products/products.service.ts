import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
  ) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = new this.productModel(createProductDto);
    return product.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) throw new NotFoundException(`Producto con id ${id} no encontrado`);
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const updated = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
    if (!updated) throw new NotFoundException(`Producto con id ${id} no encontrado`);
    return updated;
  }

  async remove(id: string): Promise<{ message: string }> {
    const deleted = await this.productModel.findByIdAndDelete(id).exec();

    if (!deleted) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }

    return { message: `Producto con id ${id} eliminado con éxito` };
  }


}
