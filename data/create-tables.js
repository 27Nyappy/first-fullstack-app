require('dotenv').config();
const pg = require('pg');
const Client = pg.Client;

const client = new Client(process.env.DATABASE_URL);

client.connect()
    .then(() => {
        return client.query(`
            CREATE TABLE sizes (
                id SERIAL PRIMARY KEY NOT NULL,
                size VARCHAR(256) NOT NULL
        );
            CREATE TABLE cubs (
                id SERIAL PRIMARY KEY NOT NULL,
                name VARCHAR(256) NOT NULL,
                size_id INTEGER NOT NULL REFERENCES sizes(id),
                weight INTEGER NOT NULL,
                friendly BOOLEAN NOT NULL,
                url VARCHAR(256) NOT NULL,
                fun_fact VARCHAR(256) NOT NULL
            );
        `);
    })
    .then(
        () => console.log('create tables complete'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });