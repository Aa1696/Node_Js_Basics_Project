const Pool = require('pg').Pool;
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'Node_Js_Complete_Guide',
    password: 'Aa@13421696',
    port: 5432
});
module.exports = pool;