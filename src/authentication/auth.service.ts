import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginOutputDto } from './dto/login-output.dto';
import * as  bcrypt from 'bcryptjs';
import { Logger, InjectPinoLogger } from "nestjs-pino";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectPinoLogger(AuthService.name)
    private logger: Logger,
  ) { }

  async login(username: string, password: string): Promise<LoginOutputDto> {
    const user = await this.usersService.findOne(username);
    const errMsg = 'username or password error';
    if (!user) {
      this.logger.warn('login username not found');
      throw new UnauthorizedException(errMsg);
    }
    const isMatching = bcrypt.compareSync(password, user.password);
    if (!isMatching) {
      this.logger.error('login password error');
      throw new UnauthorizedException(errMsg);
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }

  async register(username: string, password: string) {
    const _password = bcrypt.hashSync(password, 10);
    return this.usersService.register({ username, password: _password });
  }

  async isUsernameDuplicate(username: string) {
    return { isDuplicate: !!await this.usersService.findOne(username) };
  }

  async getUsers() {
    const res = await this.usersService.getUsers();
    return res;
  }
}