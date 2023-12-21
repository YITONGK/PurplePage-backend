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
  sequelize = new Sequelize({
    username: process.env[config.username],
    password: process.env[config.password],
    database: process.env[config.database],
    host: process.env[config.host],
    dialect: "mssql",
    dialectOptions: {
      authentication: {
        type: "ntlm",
        options: {
          userName: process.env[config.username],
          password: process.env[config.password],
          domain: process.env[config.domain],
        },
      },
      options: {
        encrypt: true,
        trustServerCertificate: true,
      },
    },
  });

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
    console.log(model);
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
