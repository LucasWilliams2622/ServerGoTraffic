// models/Revenue.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Revenue = sequelize.define(
    "Revenue",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      idBooking: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      revenueDate: {
        type: DataTypes.DATEONLY, // Chỉ giữ ngày (không giữ giờ)
        allowNull: false,
      },
    },
   
  );

  return Revenue;
};
