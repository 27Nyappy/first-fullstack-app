require('dotenv').config();
const pg = require('pg');
const Client = pg.Client;
const cubs = require('./cubs');
const client = new Client(process.env.DATABASE_URL);

client.connect()
    .then(() => {
        return Promise.all(
            cubs.map(cub => {
                return client.query(`
                INSERT INTO cubs (name, size, weight, friendly, url, fun_fact)
                VALUES ($1, $2, $3, $4, $5, $6)
            `,
                [cub.name, cub.size, cub.weight, cub.friendly, cub.url, cub.funFact]);
            })
        );
    })
    .then(
        () => console.log('seed data load complete'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });