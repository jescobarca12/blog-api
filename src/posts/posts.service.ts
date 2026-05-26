import { pool } from '../db';
import { PostInput } from './posts.schema';

export async function obtenerTodos() {
  const result = await pool.query('SELECT * FROM posts');
  return result.rows;
}

export async function obtenerPorId(id: number) {
  const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
  return result.rows[0];   // undefined si no existe
}

export async function crear(data: PostInput) {
  const { titulo, contenido, autor_id, categoria_id, publicado, vistas } = data;

  const result = await pool.query(
    `INSERT INTO posts (titulo, contenido, autor_id, categoria_id, publicado, vistas)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [titulo, contenido, autor_id, categoria_id ?? null, publicado ?? false, vistas ?? 0]
  );
  return result.rows[0];
}

export async function actualizar(id: number, data: PostInput) {
  const { titulo, contenido, autor_id, categoria_id, publicado, vistas } = data;

  const result = await pool.query(
    `UPDATE posts
     SET titulo = $1,
         contenido = $2,
         autor_id = $3,
         categoria_id = $4,
         publicado = $5,
         vistas = $6,
         updated_at = NOW()
     WHERE id = $7
     RETURNING *`,
    [titulo, contenido, autor_id, categoria_id ?? null, publicado ?? false, vistas ?? 0, id]
  );
  return result.rows[0];   // undefined si no existe
}

export async function eliminar(id: number) {
  const result = await pool.query(
    'DELETE FROM posts WHERE id = $1 RETURNING id',
    [id]
  );
  return result.rows[0];   // undefined si no existe
}