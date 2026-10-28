// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { request } from 'express';
// import { Observable } from 'rxjs';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const authorization = request.headers["authorization"];
    
//     if (!authorization) return false

//     const parts = authorization.split(":");

//     if(parts[0] !== "Basic" || !parts[1]|| !parts[2]) return false;  
    
    
    
//     return true;
//   }
// }
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private readonly jwtService: JwtService){}

    canActivate(context: ExecutionContext, //Acceso a la ruta que esta decorando

    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()

        const authHeader = request.headers["authorization"]
        if(!authHeader) return false

        const [type, token] = authHeader.split(" ")
        if (type !== "Bearer" || !token ) throw new UnauthorizedException("No se ha enviado token")

        try {
           const payload = this.jwtService.verify(token,{
            secret: process.env.JWT_SECRET
           })

           request.user = payload
        } catch (error) {
            if(error instanceof Error && error.name === "TokenExpiredError"){
                throw new UnauthorizedException("El token ha expirado")
            }
            throw new UnauthorizedException("Error al validar token")
        }

        return true
    }
}
