// const { Sequelize, Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Car = sequelize.define("Car", {
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    carBrand: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Chevrolet",
    },
    numberPlate: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Không có biển số",
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "320i",
    },

    yearOfManufacture: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2010,
    },
    seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 4,
    },
    gear: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Tự động",
    },
    fuel: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Xăng",
    },
    // ========================| Step 2 |======================== //
    locationCar: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Phường Bạch Đằng, Quận Hai Bà Trưng, Hà Nội",
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Hà Nội",
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Quận Hai Bà Trưng",
    },
    ward: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Phường Bạch Đằng",
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:
        "Số 1, Phố Bạch Đằng, Phường Bạch Đằng, Quận Hai Bà Trưng, Hà Nội",
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 21.027763,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 105.83416,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Không có mô tả",
    },
    fuelConsumption: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    //Giao xe tan noi
    isDelivery: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    deliveryWithin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    deliveryFee: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    freeDeliveryWithin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    // Phu phi
    // Gioi han so km cho thue xe
    limitKmStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 3,
    },
    maxKm: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 400,
    },
    exceededFee: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 3,
    },

    //Qua gio
    overtimeStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    //phi qua gio (h)
    overtimeCharge: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 50,
    },
    //qua bao nhieu gio se tinh gia 1 ngay
    overtimeDay: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },

    carCleanStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    carCleanFee: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 50,
    },
    //khu mui
    carDeodorizerStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    carDeodorizerFee: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 450000,
    },
    utilities: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "[]",
    },
    // ========================| Step 3 |======================== //
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "",
    },
    imageRegister: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "",
    },
    imageRegistry: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "",
    },
    imageInsurance: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "",
    },
    status: {
      // 1 doi duyet, 2 da duyet ,3 tu choi duyet
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    numberOfBooked: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    isRental: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    isBrowed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      allowNull: false,
    },
    imageThumbnail: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false,
    },
    withDriver: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  });
  return Car;
};
