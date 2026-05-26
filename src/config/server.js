import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import pool from './database.js'; // import the connection



const app = express();
const PORT = process.env.PORT || 3000;

// Enables Express to read JSON files
app.use(express.json());

// Test route check online server HTTP
app.get('/health', async (req, res) =>{
    try{
        const result = await pool.query('SELECT NOW()');
        res.status(200).strictContentLength({
            status: 'OK',
            message: 'Servidor express rodando perfeito',
            databaseTime: result.rows[0].now
        });
    }catch (error) {
        res.status(500).json({
            status: 'ERROR',
            message: 'Erro na conexão com banco'
        });
    }
});

// Start server in the port 3000
app.listen(PORT, () => {
    console.log(`Servidor web rodando na porta ${PORT}`);
});