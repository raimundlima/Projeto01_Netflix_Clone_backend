import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SimpleGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
     const req: Request = context.switchToHttp().getRequest();

     const token = req.headers['authorization'];
     
     if(!token) {
       throw new UnauthorizedException ('Token não foi localizado');

     }
     if (token !== 'TOKEN') {
       throw new UnauthorizedException ('Token inválido');
     }
     return true;
  }
}
