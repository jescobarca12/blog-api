import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../db';
import { RegisterInput, LoginInput } from './auth.schema';
import { UnauthorizedError } from '../errors';        // ← nuevo

export async function registrar(data: RegisterInput) {
  const { email, password, nombre } = data;
  const password_hash = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO usuarios (email, password_hash, nombre)
     VALUES ($1, $2, $3)
     RETURNING id, email, nombre, created_at`,
    [email, password_hash, nombre]
  );

  return result.rows[0];
}

export async function login(data: LoginInput) {
  const { email, password } = data;

  const result = await pool.query(
    'SELECT id, email, nombre, password_hash FROM usuarios WHERE email = $1',
    [email]
  );

  const usuario = result.rows[0];

  if (!usuario) {
    throw new UnauthorizedError('Credenciales inválidas');   // ← cambiado
  }

  const correcto = await bcrypt.compare(password, usuario.password_hash);

  if (!correcto) {
    throw new UnauthorizedError('Credenciales inválidas');   // ← cambiado
  }

  const token = jwt.sign(
    { userId: usuario.id, email: usuario.email },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  );

  return {
    token,
    usuario: { id: usuario.id, email: usuario.email, nombre: usuario.nombre },
  };
}