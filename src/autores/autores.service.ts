import { pool } from '../db';
import { AutorInput } from './autores.schema';
export async function obtenerTodos(){
    const result = await pool.query('SELECT * FROM autores');
    return result.rows;
}
export async function obtenerPorId(id: number) {
  const result = await pool.query('SELECT * FROM autores WHERE id = $1', [id]);
  return result.rows[0];   // undefined si no existe
}
export async function crear(data: AutorInput) {
    const { nombre, email, bio } = data;
    const result = await pool.query(
        `INSERT INTO autores (nombre, email, bio) VALUES ($1, $2, $3) RETURNING *`,
        [nombre, email, bio ?? null]
    );
    return result.rows[0];
}
export async function actualizar(id: number, data: AutorInput) {
    const { nombre, email, bio } = data;
  const result = await pool.query(
    `UPDATE autores SET nombre = $1, email = $2, bio = $3, updated_at = NOW()
     WHERE id = $4 RETURNING *`,
    [nombre, email, bio ?? null, id]
  );
  return result.rows[0];   // undefined si no existe
}
export async function eliminar(id: number) {
  const result = await pool.query(
    'DELETE FROM autores WHERE id = $1 RETURNING id',
    [id]
  );
  return result.rows[0];   // undefined si no existe
}