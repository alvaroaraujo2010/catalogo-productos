import { ApiProperty } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateProductSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  descripcion: z.string().optional(),
  precio: z.number().positive('El precio debe ser mayor a 0'),
  categoria: z.string().optional(),
});

export class CreateProductDto extends createZodDto(CreateProductSchema) {
  @ApiProperty({ example: 'Laptop Dell XPS 13', description: 'Nombre del producto' })
  nombre: string;

  @ApiProperty({ example: 'Laptop ultradelgada con procesador Intel i7', description: 'Descripción breve del producto', required: false })
  descripcion?: string;

  @ApiProperty({ example: 2500, description: 'Precio del producto' })
  precio: number;

  @ApiProperty({ example: 'Electrónica', description: 'Categoría del producto', required: false })
  categoria?: string;
}
