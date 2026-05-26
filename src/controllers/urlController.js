import { nanoid } from "nanoid";
import pool from '../config/database.js';

export const shorterURL = async (req, res) => {
    const {urlOriginal} = req.body;

    if(!urlOriginal){
        return res.status(400).json({error: 'Envie uma url original válida.'});
    }

    try {
        const hash = nanoid(6);

        const query = `
            INSERT INTO urls (url_original, hash)
            VALUES ($1, $2)
            RETURNING *;
        `;
        const values = [urlOriginal, hash];
        const result = await pool.query(query, values);

        return res.status(201).json({
            message: 'URL encurtada com sucesso!',
            data: result.rows[0],
            urlShort: `http://localhost:3000/${hash}`
        });
    } catch (error) {
        console.error('Erro ao encurtar URL:', error.message);
        return res.status(500).json({error: 'Erro interno no servidor ao processar URL.'})
    }
};

export const redirectUrl = async (req, res) => {
    const{hash} = req.params;

    try{
        const searchQuery = 'SELECT * FROM urls WHERE hash = $1';
        const result = await pool.query(searchQuery, [hash]);

        if (result.rows.length === 0){
            return res.status(404).json({error: 'Link encurtado não encontrado.'});
        }

        const foundUrl = result.rows[0];

        const attClickQuery = 'UPDATE urls SET clicks = clicks + 1 WHERE hash = $1';
        await pool.query(attClickQuery, [hash]);

        return res.redirect(302, foundUrl.urlOriginal);
    }catch (error) {
    console.error('Erro ao redirecionar:', error.message);
    return res.status(500).json({ error: 'Erro interno ao processar redirecionamento.' });
  }
};