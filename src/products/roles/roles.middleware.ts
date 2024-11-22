import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response,NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class RolesMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.decode(token);
      if (!decoded) {
        throw new UnauthorizedException('Token inválido');
      }
      req['user'] = decoded; // Adjuntamos el token decodificado a la request
      next();
    } catch (error) {
      throw new UnauthorizedException('Error al decodificar el token');
    }
  }
}
