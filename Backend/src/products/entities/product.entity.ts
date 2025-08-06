import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @ApiProperty({ example: 'Producto de prueba', description: 'Nombre del producto' })
  @Prop({ required: true })
  nombre: string;

  @ApiProperty({ example: 'Este es un producto de ejemplo', description: 'Descripción breve del producto' })
  @Prop()
  descripcion?: string;

  @ApiProperty({ example: 1500, description: 'Precio del producto' })
  @Prop({ required: true, min: 0 })
  precio: number;

  @ApiProperty({ example: 'Electrónica', description: 'Categoría del producto' })
  @Prop()
  categoria?: string;

  @ApiProperty({ example: '6892b26b2630e106661c7f86', description: 'ID del producto' })
  _id: string;

  @ApiProperty({ example: '2025-08-06T01:39:55.730Z', description: 'Fecha de creación' })
  createdAt: Date;

  @ApiProperty({ example: '2025-08-06T01:39:55.730Z', description: 'Fecha de última actualización' })
  updatedAt: Date;

  @ApiProperty({ example: 0, description: 'Versión del documento en MongoDB' })
  __v: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
