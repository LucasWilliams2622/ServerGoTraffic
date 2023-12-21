const { Sequelize, Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define("Request", {
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bankName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bankNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    // 1 - Chờ xử lý
    // 2 - Đã xử lý
    // 3 - Đã hủy
  });
  const options = {};

  return Request;
};
