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

// "development": {
//     "dialect": "mssql",
//     "database": "ServiceDirectory_UVT_TEST",
//     "host": "vt-prd-sqltest1",
//     "dialectOptions": {
//       "options": {
//         "trustedConnection": true, // Use Windows authentication
//         "domain": "vt.uniting.org", // Your Windows domain
//         "userName": "VT\adrian.teo", // Your Windows username
//         "password": "Abcde" // Your Windows password
//         }
//     }
// }