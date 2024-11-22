import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}


  async create(createProductDto: CreateProductDto) {
    return this.prismaService.product.create({ data: createProductDto });
  }

  async findAll() {
  const products = await this.prismaService.product.findMany();
  if (products.length === 0) {
    return { message: 'La lista está vacía' };
  }
  return products;    
  }

  async findOne(id: number) {
    const product = await this.prismaService.product.findUnique({ where: { id } });
    if (!product) {
      return { message: 'Producto no encontrado' };
    }
    return product;
   
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.prismaService.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  remove(id: number) {
    return this.prismaService.product.delete({ where: { id } });
  }
}
