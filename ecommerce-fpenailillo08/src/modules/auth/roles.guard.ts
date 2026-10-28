import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly reflector : Reflector){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    //*Metadata:
    const routeRoles = this.reflector.getAllAndOverride<string>(
      "roles",[
        context.getHandler(),
        context.getClass()
      ]
    )

    //*Request:
    const request = context.switchToHttp().getRequest()
    if(!request.user) throw new ForbiddenException("Usuario no autenticado")

    const userRoles = request.user.roles

    //*Comparar:
    if(routeRoles !== userRoles) throw new ForbiddenException("Sin permisos para acceder al recurso")

    return true;
  }
}
