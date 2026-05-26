import { Request, Response } from 'express';
import * as autoresService from './autores.service';
import { AutorInputSchema } from './autores.schema';
import { NotFoundError } from '../errors';

export async function obtenerTodos(req: Request, res: Response) {
  const autor = await autoresService.obtenerTodos();
  res.json(autor);
}

export async function obtenerPorId(req: Request, res: Response) {
  const id = Number(req.params.id);
  const autor = await autoresService.obtenerPorId(id);

  if (!autor) {
    throw new NotFoundError('Autor no encontrado');
  }

  res.json(autor);
}

export async function crear(req: Request, res: Response) {
  const data = AutorInputSchema.parse(req.body);
  const nuevo = await autoresService.crear(data);
  res.status(201).json(nuevo);
}

export async function actualizar(req: Request, res: Response) {
  const id = Number(req.params.id);
  const data = AutorInputSchema.parse(req.body);
  const actualizado = await autoresService.actualizar(id, data);

  if (!actualizado) {
    throw new NotFoundError('Autor no encontrado');
  }

  res.json(actualizado);
}

export async function eliminar(req: Request, res: Response) {
  const id = Number(req.params.id);
  const borrado = await autoresService.eliminar(id);

  if (!borrado) {
    throw new NotFoundError('Autor no encontrado');
  }

  res.status(204).send();
}