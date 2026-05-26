import { Request, Response } from 'express';
import * as authService from './auth.service';
import { RegisterSchema, LoginSchema } from './auth.schema';

export async function register(req: Request, res: Response) {
  const data = RegisterSchema.parse(req.body);
  const usuario = await authService.registrar(data);
  res.status(201).json(usuario);
}

export async function login(req: Request, res: Response) {
  const data = LoginSchema.parse(req.body);
  const result = await authService.login(data);
  res.json(result);
}