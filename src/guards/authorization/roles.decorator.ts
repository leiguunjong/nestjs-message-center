import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
// 调用装饰器@Roles(roleA, roleB)时，roles值为[roleA, roleB]
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);