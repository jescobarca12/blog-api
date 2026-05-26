import { z } from 'zod';

export const RegisterSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(8, 'El password debe tener al menos 8 caracteres'),
  nombre:   z.string().min(1).max(100),
});

export const LoginSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(1, 'El password es obligatorio'),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput    = z.infer<typeof LoginSchema>;