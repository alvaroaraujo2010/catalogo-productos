import { createZodDto } from 'nestjs-zod';
import { CreateProductSchema } from './create-product.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export const UpdateProductSchema = CreateProductSchema.partial();

export class UpdateProductDto extends createZodDto(UpdateProductSchema) {
  @ApiPropertyOptional({ example: 'Laptop Dell XPS 13', description: 'Nombre del producto' })
  nombre?: string;

  @ApiPropertyOptional({ example: 'Laptop ultradelgada con procesador Intel i7', description: 'Descripción breve del producto' })
  descripcion?: string;

  @ApiPropertyOptional({ example: 2500, description: 'Precio del producto' })
  precio?: number;

  @ApiPropertyOptional({ example: 'Electrónica', description: 'Categoría del producto' })
  categoria?: string;
}
