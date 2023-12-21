const { Sequelize, Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const NotificationBooking = sequelize.define("NotificationBooking", {
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idBooking: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Mặc định là chưa đọc
    },
    
  });
  const options = {};

  return NotificationBooking;
};
