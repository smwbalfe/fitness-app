const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Zxasqw12",
    database: "fitnessDB",
    host: "localhost",
    port: "5432"
});

module.exports = pool;