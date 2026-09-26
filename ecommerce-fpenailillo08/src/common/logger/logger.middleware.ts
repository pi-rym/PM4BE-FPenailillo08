
import { NextFunction, Request, Response } from 'express';

export function loggerGlobal (req: Request, res: Response, next: NextFunction) {
    
    const method = req.method;
    const route = req.originalUrl;
    const date = new Date();

    console.log(`Método: ${method} | Ruta: ${route} | Fecha: ${date}`);

    next();
  }

