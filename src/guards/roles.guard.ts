import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enum/role.enum';
import { ROLES_KEY } from '../decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
            ROLES_KEY,
            [
                context.getHandler(),
                context.getClass(),
            ]
        );
        if (!requiredRoles) {
            return true;
        }
        const role = context.switchToHttp().getRequest()?.user?.role;
        if (role === 'admin') {
            // Admin opens all permissions
            // 管理员开放所有权限
            return true;
        }
        return requiredRoles.some(r => r === role);
    }
}