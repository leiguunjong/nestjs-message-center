import { Body, Controller, Post, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInputDto } from './dto/login-input.dto';
import { UsernameDto } from './dto/username.dto';
import { RegisterInputDto } from './dto/register-input.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({summary: '用户登录'})
  @ApiResponse({ status: HttpStatus.OK, description: '登录成功' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: '登录失败' })
  login(@Body() dto: LoginInputDto) {
    return this.authService.login(dto.username, dto.password);
  }

  @Post('register')
  @ApiOperation({summary: '用户注册'})
  @ApiResponse({ status: HttpStatus.CREATED, description: '注册成功' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: '用户名重复' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: '服务端错误' })
  register(@Body() dto: RegisterInputDto) {
    return this.authService.register(dto.username, dto.password);
  }

  @Post('checkUsername')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: '检查用户名是否重复'})
  @ApiResponse({ status: HttpStatus.OK, description: '响应payload的isDuplicate: true为重复' })
  checkUsername(@Body() dto: UsernameDto) {
    return this.authService.isUsernameDuplicate(dto.username);
  }

  @Get('getUsers')
  @ApiOperation({summary: '获取用户列表'})
  @ApiResponse({ status: HttpStatus.OK, description: '获取列表成功' })
  getUsers() {
    return this.authService.getUsers();
  }
}