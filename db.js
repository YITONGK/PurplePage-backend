const sql = require('mssql');

const config = {
    server: '20.211.163.165',
    user: 'SA',
    password: 'V4Ei2oe8eH',
    database: 'Uniting',
    options: {
        port: 8080,
        encrypt: true, // Change to true if the server requires encrypted connections
    },
};

const pool = new sql.ConnectionPool(config);

module.exports = pool;


// "development": {
//     "username": "SA",
//     "password": "V4Ei2oe8eH",
//     "database": "Uniting",
//     "host": "20.211.163.165",
//     "port": 8080,
//     "dialect": "mssql"
//   },