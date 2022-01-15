const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const dbConfig = require('../config/config.js');

const basename = path.basename(__filename);

const db = {};

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    logging: (msg) => console.log(msg),
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    useUTC: false,
    timezone: '+05:30',
    pool: {
      max: 100,
      min: 20,
      acquire: 1000000,
      idle: 200000,
    },
  },
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err) => {
    console.log('Error occured while connecting to database ...!');
    console.log(err);
  });


fs.readdirSync(__dirname)
  .filter(
    (file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js',
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;
