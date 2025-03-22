import { Body, Controller, Post, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInputDto } from '../users/login-input.dto';
import { UsernameDto } from '../users/username.dto';
import { RegisterInputDto } from '../users/register-input.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() dto: LoginInputDto) {
    return this.authService.signIn(dto.username, dto.password);
  }

  @Post('register')
  register(@Body() dto: RegisterInputDto) {
    return this.authService.register(dto.username, dto.password);
  }

  @Post('checkUsername')
  @HttpCode(HttpStatus.OK)
  checkUsername(@Body() dto: UsernameDto) {
    return this.authService.isUsernameDuplicate(dto.username);
  }

  @Get('getUsers')
  getUsers() {
    return this.authService.getUsers();
  }
}