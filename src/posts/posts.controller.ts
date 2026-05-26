import { Request, Response } from "express";
import * as postsService from "./posts.service";
import { PostInputSchema } from "./posts.schema";
import { NotFoundError, ForbiddenError } from "../errors";

export async function obtenerTodos(req: Request, res: Response) {
  const posts = await postsService.obtenerTodos();
  res.json(posts);
}

export async function obtenerPorId(req: Request, res: Response) {
  const id = Number(req.params.id);
  const post = await postsService.obtenerPorId(id);

  if (!post) {
    throw new NotFoundError("Post no encontrado");
  }

  res.json(post);
}

export async function crear(req: Request, res: Response) {
  const data = PostInputSchema.parse(req.body);

  // Sobrescribir autor_id con el del usuario logueado
  data.autor_id = req.user!.userId; // ← truco profesional

  const nuevo = await postsService.crear(data);
  res.status(201).json(nuevo);
}

export async function actualizar(req: Request, res: Response) {
  const id = Number(req.params.id);
  const data = PostInputSchema.parse(req.body);

  // 1. Buscar el post (para chequear ownership)
  const post = await postsService.obtenerPorId(id);
  if (!post) {
    throw new NotFoundError("Post no encontrado");
  }

  // 2. Verificar ownership (autorizar)
  if (post.autor_id !== req.user!.userId) {
    throw new ForbiddenError("Solo puedes editar tus propios posts");
  }

  // 3. AHORA SÍ — actualizar
  const actualizado = await postsService.actualizar(id, data);

  res.json(actualizado);
}

export async function eliminar(req: Request, res: Response) {
  const id = Number(req.params.id);

  // 1. Buscar el post
  const post = await postsService.obtenerPorId(id);

  // 2. Si no existe → 404
  if (!post) {
    throw new NotFoundError("Post no encontrado");
  }

  // 3. Verificar ownership
  if (post.autor_id !== req.user!.userId) {
    throw new ForbiddenError("Solo puedes eliminar tus propios posts");
  }

  // 4. Si llega aquí, autorizado → borrar
  await postsService.eliminar(id);
  res.status(204).send();
}
