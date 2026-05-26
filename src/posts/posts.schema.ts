import { z } from 'zod';

export const PostInputSchema = z.object({
  titulo:        z.string().min(1).max(200),
  contenido:     z.string().min(50),
  autor_id:      z.number().int().positive(),
  categoria_id:  z.number().int().positive().nullable().optional(),
  publicado:     z.boolean().optional(),
  vistas:        z.number().int().min(0).optional(),
});

export type PostInput = z.infer<typeof PostInputSchema>;