const { Sequelize, Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const BookingCar = sequelize.define("Booking", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idCar: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    timeFrom: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    timeTo: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    totalDay: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    totalMoney: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    feeDelivery: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    feeInsurance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    feeService: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      // 1 pending (dax gui yeu cau muon thue xe | chu xe chua dong y cho thue),
      // 2 success (chu xe dong y cho thue),
      // 3 delivering  (dang giao xe),

      // 4 during  (khach hang da nhan xe - xe dang trong chuyen),
      // 5 return ( khach hang tra xe - ket thuc chuyen)

      // 6 done (khach hang da tra xe va chu xe nhan du tien),
      // 7
      // 8 cancel (khach hang huy chuyen),
      // 9 cancelByOwner (chu xe huy chuyen),
      // 10 deny (chu xe tu choi cho thue),
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.NOW,
    },
  });

  // const options = {};
  return BookingCar;
  // return sequelize.define("booking", attributes, options);
};
