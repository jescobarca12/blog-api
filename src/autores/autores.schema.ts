import {z} from 'zod';
export const AutorInputSchema = z.object({
  nombre: z.string().min(1).max(100),
  email:  z.string().email(),
  bio:    z.string().nullable().optional(),
});
export type AutorInput = z.infer<typeof AutorInputSchema>;