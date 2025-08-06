import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class tokenGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Falta el token en el encabezado Authorization');
    }
    const token = authHeader.split(' ')[1];
    
    if (token !== process.env.FIXED_TOKEN) {
      throw new UnauthorizedException('Token inválido');
    }

    return true;
  }
}
