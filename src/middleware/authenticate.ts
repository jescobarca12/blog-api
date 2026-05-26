import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors';

// Definir qué hay adentro del payload del JWT
interface JwtPayload {
  userId: number;
  email: string;
}

// Extender el tipo de Request para tener req.user
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  // 1. Obtener el header
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError('Token no proporcionado');
  }

  // 2. Verificar el formato "Bearer xxx"
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    throw new UnauthorizedError('Formato de token inválido');
  }

  // 3. Verificar el token con jwt.verify
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    // 4. Adjuntar el user al request
    req.user = payload;

    // 5. Continuar
    next();
  } catch (err) {
    throw new UnauthorizedError('Token inválido o expirado');
  }
}