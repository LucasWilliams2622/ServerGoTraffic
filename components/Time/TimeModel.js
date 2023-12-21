// models/Time.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Time = sequelize.define('Time', {
    day: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quarter: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Time;
};
