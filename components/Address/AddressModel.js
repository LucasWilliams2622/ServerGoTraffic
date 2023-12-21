const { Sequelize, Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define("Address", {
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Hà Nội",
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Ba Đình",
    },
    ward: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Cống Vị",
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Đội Cấn",
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "10",
    },
    note: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Giao hàng nhanh",
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "10 Đội Cấn, Cống Vị, Ba Đình, Hà Nội",
    },
  });
  const options = {};

  return Address;
};
