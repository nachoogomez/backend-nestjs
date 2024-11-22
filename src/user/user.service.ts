import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';


@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

 async create(createAuthDto: CreateAuthDto) {
  const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);
  return this.prismaService.user.create({
    data: {
      ...createAuthDto,
      password: hashedPassword,
    },
  });
 }
 
async findAll(){
  return this.prismaService.user.findMany();
}

async findOne(id: number) {
  return this.prismaService.user.findUnique({ where: { id } });
}

async findByEmail(email: string) {
  return this.prismaService.user.findUnique({ where: { email } });
}


async remove(id: number) {
  return this.prismaService.user.delete({ where: { id } });
}
 
}