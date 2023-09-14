'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const { initialize } = require('passport');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const process = require('process');
// const { initialize } = require('passport');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
// const db = {};
// const kerberos = require('kerberos'); // Import the kerberos module

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   // Kerberos authentication initialization
//   const realm = 'VT.UNITING.ORG'; // Replace with your Kerberos realm
//   kerberos.initializeClient('vt-prd-sqltest1', { realm });
  
//   // Obtain a Kerberos client token
//   kerberos.authGSSClientInit('vt-prd-sqltest1@YOUR-REALM', (err, context) => {
//     if (err) {
//       console.error('Kerberos initialization error:', err);
//       return;
//     }
    
//     kerberos.authGSSClientStep(context, '', (err, clientToken) => {
//       if (err) {
//         console.error('Kerberos client token generation error:', err);
//         return;
//       }
      
//       // Use the Kerberos client token as the password for authentication
//       sequelize = new Sequelize(config.database, config.username, clientToken.toString('base64'), config);
      
//       // Continue with the Sequelize setup
//       setupModelsAndAssociations();
//     });
//   });
// }

// // Function to set up Sequelize models and associations
// function setupModelsAndAssociations() {
//   fs
//     .readdirSync(__dirname)
//     .filter(file => {
//       return (
//         file.indexOf('.') !== 0 &&
//         file !== basename &&
//         file.slice(-3) === '.js' &&
//         file.indexOf('.test.js') === -1
//       );
//     })
//     .forEach(file => {
//       const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//       db[model.name] = model;
//     });

//   Object.keys(db).forEach(modelName => {
//     if (db[modelName].associate) {
//       db[modelName].associate(db);
//     }
//   });

//   db.sequelize = sequelize;
//   db.Sequelize = Sequelize;

//   module.exports = db;
// }

// // Export the setupModelsAndAssociations function if needed elsewhere in your code
// module.exports.setupModelsAndAssociations = setupModelsAndAssociations;


// "development": {
//   "username": "purplepage",
//   "password": "password",
//   "database": "purplepage",
//   "host": "164.152.166.150",
//   "dialect": "mysql"
// },
