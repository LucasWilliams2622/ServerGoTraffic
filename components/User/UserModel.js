const { Sequelize, Model, DataTypes } = require("sequelize");
module.exports = model;

function model(sequelize) {
  const attributes = {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    name: { type: DataTypes.STRING },
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },

    phone: { type: DataTypes.STRING, uniqe: true, allowNull: false },
    email: { type: DataTypes.STRING, uniqe: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },

    gender: { type: DataTypes.BOOLEAN, defaultValue: true },
    dob: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    avatar: { type: DataTypes.STRING, defaultValue: "" },
    point: { type: DataTypes.INTEGER, defaultValue: 0 },

    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },

    address: { type: DataTypes.STRING, defaultValue: "" },
    longitude: { type: DataTypes.FLOAT, defaultValue: 106.62776583887255 },
    latitude: { type: DataTypes.FLOAT, defaultValue: 10.853838548226635 },

    surplus: { type: DataTypes.INTEGER, defaultValue: 0 },
    status: { type: DataTypes.STRING, defaultValue: 1 },
    role: { type: DataTypes.INTEGER, defaultValue: 1 },
    isLogin: { type: DataTypes.BOOLEAN, defaultValue: false },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },

    verificationCode: { type: DataTypes.DOUBLE, defaultValue: 999999 },
    verificationCodeMail: { type: DataTypes.DOUBLE, defaultValue: 999999 },

    isVerifiedDriverLicense: { type: DataTypes.BOOLEAN, defaultValue: false },
    isVerifiedPhone: { type: DataTypes.BOOLEAN, defaultValue: false },
    isVerifiedEmail: { type: DataTypes.BOOLEAN, defaultValue: false },
    rating: { type: DataTypes.FLOAT, defaultValue: 0 },
    totalRide: { type: DataTypes.INTEGER, defaultValue: 0 },
  };

  const options = {
    defaultScope: {
      // exclude password hash by default
      attributes: { exclude: ["passwordHash"] },
    },
    scopes: {
      // include hash with this scope
      withHash: { attributes: {} },
    },
  };

  return sequelize.define("User", attributes, options);
}
