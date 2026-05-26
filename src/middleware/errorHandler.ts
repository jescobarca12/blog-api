import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors';
import { ZodError } from 'zod';

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Si es un error nuestro (con status code)
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  // Si es un error de validación de Zod
  if (err instanceof ZodError) {
    res.status(400).json({ errores: err.issues });
    return;
  }

  // Cualquier otro error → 500
  console.error('Error inesperado:', err);
  res.status(500).json({ error: 'Error en el servidor' });
};