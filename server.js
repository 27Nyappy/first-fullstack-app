require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const pg = require('pg');

const Client = pg.Client;
const client = new Client(process.env.DATABASE_URL);
client.connect();

const app = express();
const PORT = process.env.PORT;
app.use(morgan('dev'));
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.get('/api/sizes', (req, res) => {
    client.query(`
        SELECT
            id,
            size,
        FROM sizes
        ORDER BY size;
    `)
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || err
            });
        });
})

app.get('/api/cubs', (req, res) => {
    client.query(`
        SELECT
            c.name,
            c.size_id,
            s.size
            c.weight,
            c.friendly,
            c.url,
            c.fun_fact AS "funFact"
        FROM cubs c
        JOIN sizes s
        ON c.size_id = s.id
        ORDER BY name;
    `)
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || err
            });
        });
});

app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});