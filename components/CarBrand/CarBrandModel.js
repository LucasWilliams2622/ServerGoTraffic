const { Sequelize, Model, DataTypes } = require("sequelize");
module.exports = model;

function model(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };
  const options = {};

  return sequelize.define("carBrand", attributes, options);
}
