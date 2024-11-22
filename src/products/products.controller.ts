import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: 'Create a new product if you are SUPERADMIN, you need to send access_token in bearer token' })
  @ApiResponse({ status: 200, description: 'Return product created ' })
  @ApiResponse({ status: 404, description: 'Forbidden' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @Roles('ADMIN', 'SUPERADMIN', 'USER')
  @ApiOperation({ summary: 'Get all products, you need to send access_token in bearer token' })
  @ApiResponse({ status: 200, description: 'Return products ' })
  @ApiResponse({ status: 404, description: 'Forbidden' })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN', 'SUPERADMIN', 'USER')
  @ApiOperation({ summary: 'Get one product, you need to send access_token in bearer token' })
  @ApiResponse({ status: 200, description: 'Return product ' })
  @ApiResponse({ status: 404, description: 'Forbidden' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: 'Update a product if you are SUPERADMIN or ADMIN, you need to send access_token in bearer token' })
  @ApiResponse({ status: 200, description: 'Return edit product ' })
  @ApiResponse({ status: 404, description: 'Forbidden' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: 'Delete product if you are SUPERADMIN or ADMIN, you need to send access_token in bearer token' })
  @ApiResponse({ status: 200, description: 'Product deleted ' })
  @ApiResponse({ status: 404, description: 'Forbidden' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}

