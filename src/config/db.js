const { Pool } = require("pg");

console.log("Trying to connect to PostgreSQL...");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "medvault",
    password: "postgres",
    port: 5432,
});

pool.connect()
    .then(() => {
        console.log("PostgreSQL connected successfully");
    })
    .catch((err) => {
        console.error("PostgreSQL connection error:", err.message);
    });

module.exports = pool;
