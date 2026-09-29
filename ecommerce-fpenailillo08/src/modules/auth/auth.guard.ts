import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers["authorization"];
    
    if (!authorization) return false

    const parts = authorization.split(":");

    if(parts[0] !== "Basic" || !parts[1]|| !parts[2]) return false;  
    
    
    
    return true;
  }
}
