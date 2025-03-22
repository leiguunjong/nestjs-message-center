import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginOutputDto } from '../users/login-output.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) { }

  async signIn(username: string, password: string): Promise<LoginOutputDto> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== password) {
      throw new UnauthorizedException('username or password error');
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }

  async register(username: string, password: string) {
    return this.usersService.register({ username, password });
  }

  async isUsernameDuplicate(username: string) {
    return { isDuplicate: !!await this.usersService.findOne(username) };
  }

  async getUsers(): Promise<any> {
    const res = await this.usersService.getUsers();
    return res;
  }
}