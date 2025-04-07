import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UsersService } from '../users/users.service';
import { Logger, InjectPinoLogger } from "nestjs-pino";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    @InjectPinoLogger(AuthGuard.name)
    private logger: Logger,
    private configService: ConfigService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      this.logger.warn('lack token');
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.configService.get<string>('JWT_SECRET')
        }
      );
      payload.role = (await this.usersService.findOne(payload.username))?.role;
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      // 把payload挂在request中，以便在路由处理器中可以访问到
      request.user = payload;
      return true;
    } catch (err) {
      this.logger.error(err);
      throw new UnauthorizedException(err?.message);
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
