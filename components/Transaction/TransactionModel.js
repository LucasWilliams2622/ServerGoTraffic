const { Sequelize, Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define("Transaction", {
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    transactionType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "withdraw",
      // withdraw, recharge
    },
    timastamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  });
  const options = {};

  return Transaction;
};
