const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "asdfghjk",
    host: "localhost",
    port: 5432,
    database: "compcareproducts"
});

module.exports = pool;