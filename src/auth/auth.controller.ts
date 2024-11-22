import { Controller, Get, Post, Body, UnauthorizedException} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

 @Post('register')
 @ApiOperation({ summary: 'Register a new user' })
 @ApiResponse({ status: 200, description: 'Return user ' })
 async register(@Body() createAuthDto: CreateAuthDto) {
   return this.authService.register(createAuthDto);
 }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ status: 200, description: 'Return access_token ' })
  async login(@Body() loginDto: { email: string; password: string }) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }
}
