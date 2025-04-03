import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { jwtConstants } from '../authentication/constants';
import { Request } from 'express';
import { UsersService } from '../users/users.service';
import { Logger, InjectPinoLogger } from "nestjs-pino";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    @InjectPinoLogger(AuthGuard.name)
    private logger: Logger
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('authGuard--------------------------------');

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      this.logger.warn('lack token')
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      );
      // TODO 读取用户角色关系表
      payload.role = (await this.usersService.findOne(payload.username))?.role;

      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request.user = payload;
      return true;
    } catch (err) {
      this.logger.error(err)
      throw new UnauthorizedException(err?.message);
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
