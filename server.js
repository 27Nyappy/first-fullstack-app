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
            size
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
});

app.post('/api/cubs', (req, res) => {
    const cub = req.body;
    console.log(cub);
    client.query(`
        INSERT INTO cubs (name, size_id, weight, friendly, url, fun_fact)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `,
    [cub.name, cub.size, cub.weight, cub.friendly, cub.url, cub.funFact]
    )
        .then(result => {
            res.json(result.rows[0]);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || err
            });
        });
});

app.get('/api/cubs/:id', (req, res) => {
    const id = req.params.id;

    client.query(`
        SELECT
            cubs.*,
            size
        FROM cubs
        JOIN sizes
        ON size_id = sizes.id
        WHERE cubs.id = $1
    `,
    [id]
    )
        .then(result => {
            const cub = result.rows[0];
            console.log(cub)
            if(!cub) {
                res.status(404).json({
                    error: `Cub id ${id} does not exist.`
                });
            }
            else {
                res.json(result.rows[0]);
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || err
            });
        });
});

app.get('/api/cubs', (req, res) => {
    client.query(`
        SELECT
            cubs.id,
            name,
            size_id,
            size,
            weight,
            friendly,
            url,
            fun_fact AS "funFact"
        FROM cubs
        JOIN sizes
        ON size_id = sizes.id
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