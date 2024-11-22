import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '../types/user.types';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
