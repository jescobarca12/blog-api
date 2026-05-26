import { Pool, PoolConfig } from 'pg';
import 'dotenv/config';

// Si existe DATABASE_URL (producción), usarla
// Si no (desarrollo local), usar las variables individuales
const config: PoolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }, // Neon requiere SSL
    }
  : {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    };

export const pool = new Pool(config);