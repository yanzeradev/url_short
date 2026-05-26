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

// Test connection then read the file
pool.query('SELECT NOW()')
    .then(() => console.log('Conexão estabelecida com Postgres via docker'))
    .catch((err) => console.error('Erro ao conectar com banco de dados:', err));

export default pool;