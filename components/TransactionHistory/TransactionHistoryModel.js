const { Sequelize, Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const TransactionHistory = sequelize.define("TransactionHistory", {
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idTransaction: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    discription: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "withdraw",
    },
    timastamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  });
  const options = {};

  return TransactionHistory;
};
