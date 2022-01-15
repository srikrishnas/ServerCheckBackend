// var sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const server_list = sequelize.define('server_list', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    urls: DataTypes.STRING,
    priorities: DataTypes.INTEGER,
  });
  return server_list;
};
