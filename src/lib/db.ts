import { Pool } from 'pg';

declare global {
  // eslint-disable-next-line no-var
  var __dbPool: Pool | undefined;
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('DATABASE_URL no está configurada en las variables de entorno.');
  }
}

export const pool =
  global.__dbPool ||
  new Pool({
    connectionString: connectionString || undefined,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 8000,
  });

if (process.env.NODE_ENV !== 'production') {
  global.__dbPool = pool;
}

export async function initDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS portal_apps (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      url TEXT,
      slug VARCHAR(100),
      status VARCHAR(50) DEFAULT 'online',
      category VARCHAR(100) NOT NULL,
      metric VARCHAR(100),
      metric_label VARCHAR(100),
      is_article BOOLEAN DEFAULT FALSE,
      icon_type VARCHAR(100) DEFAULT 'globe',
      display_order INT DEFAULT 0,
      help_info JSONB,
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `);
}
