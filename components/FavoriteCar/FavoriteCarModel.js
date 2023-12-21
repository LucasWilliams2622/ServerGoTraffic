const { Sequelize, Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const FavoriteCar = sequelize.define("FavoriteCar", {
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    idCar: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  });
  const options = {};

  return FavoriteCar;
};
