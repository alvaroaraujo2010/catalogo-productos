import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags, ApiOkResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Product } from './entities/product.entity';
import { tokenGuard } from 'src/common/guards/token.guard';

@ApiTags('products')
@ApiBearerAuth()
@UseGuards(tokenGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'Producto creado exitosamente',
    type: Product,
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Lista de productos',
    type: [Product],
  })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Producto encontrado',
    type: Product,
  })
  @ApiNotFoundResponse({ description: 'Producto no encontrado' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Producto actualizado exitosamente',
    type: Product,
  })
  @ApiNotFoundResponse({ description: 'Producto no encontrado' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Producto eliminado exitosamente',
    schema: {
      example: { message: 'Producto con id 123 eliminado con éxito' },
    },
  })
  @ApiNotFoundResponse({ description: 'Producto no encontrado' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
