const { Sequelize, DataTypes } = require("sequelize");

// connect to db
const sequelize = new Sequelize("gotrafficdb", "root", "gotraffic&9299", {
  // host: "103.57.129.166:3000",
  host: "localhost:3000",

  dialect: "mysql",
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//===================| Models/tables |================
db.users = require("./User/UserModel")(sequelize, DataTypes);
db.carbrands = require("./CarBrand/CarBrandModel")(sequelize, DataTypes);
db.cars = require("./Car/CarModel")(sequelize, DataTypes);
db.bookings = require("./Booking/BookingModel")(sequelize, DataTypes);
db.favoritecars = require("./FavoriteCar/FavoriteCarModel")(
  sequelize,
  DataTypes
);
db.reviews = require("./Review/ReviewModel")(sequelize, DataTypes);
db.notifications = require("./Notification/NotificationModel")(
  sequelize,
  DataTypes
);
db.notificationbookings =
  require("./NotificationBooking/NotificationBookingModel")(
    sequelize,
    DataTypes
  );

db.addresses = require("./Address/AddressModel")(sequelize, DataTypes);
db.revenues = require("./Revenue/RevenueModel")(sequelize, DataTypes);
db.requests = require("./Request/RequestModel")(sequelize, DataTypes);

db.times = require("./Time/TimeModel")(sequelize, DataTypes);
db.transactions = require("./Transaction/TransactionModel")(sequelize, DataTypes);
db.transactionHistories = require("./TransactionHistory/TransactionHistoryModel")(sequelize, DataTypes);

//====================| Associations |=================
db.users.hasMany(db.cars, { foreignKey: "idUser", as: "Car" });
db.cars.belongsTo(db.users, { foreignKey: "idUser", as: "User" });

db.reviews.belongsTo(db.bookings, { foreignKey: "idBooking", as: "Booking" });
db.bookings.hasOne(db.reviews, { foreignKey: "idBooking", as: "Review" });

db.reviews.belongsTo(db.users, { foreignKey: "idUser", as: "User" });
db.users.hasMany(db.reviews, { foreignKey: "idUser", as: "Review" });

db.cars.hasMany(db.favoritecars, { foreignKey: "idCar", as: "FavoriteCar" });
db.favoritecars.belongsTo(db.cars, { foreignKey: "idCar", as: "Car" });

db.bookings.belongsTo(db.cars, { foreignKey: "idCar", as: "Car" });
db.users.hasMany(db.bookings, { foreignKey: "idUser", as: "Booking" });

db.cars.hasMany(db.bookings, { foreignKey: "idCar", as: "Booking" });
db.bookings.belongsTo(db.users, { foreignKey: "idUser", as: "User" });

db.addresses.belongsTo(db.users, { foreignKey: "idUser", as: "User" });
db.users.hasMany(db.addresses, { foreignKey: "idUser", as: "Address" });

db.revenues.belongsTo(db.times, { foreignKey: "idTime", as: "Time" });
db.revenues.hasOne(db.bookings, { foreignKey: "idBooking", as: "Booking" });

db.requests.belongsTo(db.users, { foreignKey: "idUser", as: "User" });
db.users.hasMany(db.requests, { foreignKey: "idUser", as: "Request" });


db.users.hasMany(db.transactions, { foreignKey: "idUser", as: "Transaction" });
db.transactions.belongsTo(db.users, { foreignKey: "idUser", as: "User" });

db.transactions.hasOne(db.transactionHistories, { foreignKey: "idTransaction", as: "TransactionHistory" });
db.transactionHistories.belongsTo(db.transactions, { foreignKey: "idTransaction", as: "Transaction" });

// db.sequelize.sync({ force: false,alter: true })
// .then(() => {
//     console.log('yes re-sync done!')
// })
module.exports = db;
