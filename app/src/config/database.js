import pg from 'pg';
import dotenv from 'dotenv';

// Load the .env file variables to Node.js
dotenv.config();

// Management multiple connections with the database
const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432', 10), 
});

// Script SQL to create automatic table if not exists
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS urls (
    id SERIAL PRIMARY KEY,
    url_original TEXT NOT NULL,
    hash VARCHAR(10) UNIQUE NOT NULL,
    clicks INTEGER DEFAULT 0,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

// Test connection then read the file
pool.query('SELECT NOW()')
    .then(() => {
      console.log('Conexão estabelecida com Postgres via docker');
      return pool.query(createTableQuery);
    })
    .then(() => {
      console.log('Tabela "urls" ok no banco de dados!')
    })
    .catch((err) => console.error('Erro ao conectar com banco de dados:', err.message));

export default pool;