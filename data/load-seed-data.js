require('dotenv').config();
const pg = require('pg');
const Client = pg.Client;
const sizes = require('./sizes');
const cubs = require('./cubs');
const client = new Client(process.env.DATABASE_URL);

client.connect()
    .then(() => {
        return Promise.all(
            sizes.map(size => {
                return client.query(`
                INSERT INTO sizes (size)
                VALUES ($1)
                RETURNING *
                `,
                [size])
                    .then(result => result.rows[0]);
            })
        );
    })
    .then(sizes => {
        return Promise.all(
            cubs.map(cub => {
                const size = sizes.find(size => {
                    return size.size === cub.size;
                });
                const sizeId = size.id;
                return client.query(`
                INSERT INTO cubs (name, size_id, weight, friendly, url, fun_fact)
                VALUES ($1, $2, $3, $4, $5, $6)
            `,
                [cub.name, sizeId, cub.weight, cub.friendly, cub.url, cub.funFact]);
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