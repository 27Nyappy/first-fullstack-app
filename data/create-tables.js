require('dotenv').config();
const pg = require('pg');
const Client = pg.Client;

const client = new Client(process.env.DATABASE_URL);

client.connect()
    .then(() => {
        return client.query(`
            CREATE TABLE cubs (
                id SERIAL PRIMARY KEY,
                name VARCHAR(256),
                size VARCHAR(256),
                weight INTEGER,
                friendly BOOLEAN,
                url VARCHAR(256),
                fun_fact VARCHAR(256)
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