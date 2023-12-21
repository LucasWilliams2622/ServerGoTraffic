const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("gotrafficdb", "root", "gotraffic&9299", {
  host: "103.57.129.166:3000",
  dialect: "mysql",
});
const db = require("../../components/indexModel");
const CarModel = db.cars;
const UserModel = db.users;
const CarBrandModel = db.carbrands;
const ReviewModel = db.reviews;
const BookingModel = db.bookings;
const NotificationModel = db.notifications;

const pushNotification = async (idUser, title, content, image) => {
  try {
    const user = await UserModel.findOne({
      where: { id: idUser },
    });
    if (!user) return false;
    const notification = await db.notificationbookings.create({
      idUser: user.id,
      title,
      content,
      image,
    });
    if (!notification) return false;
    console.log("notification", notification);
    return notification;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getByUser = async (idUser) => {
  try {
    const user = await UserModel.findOne({
      where: { id: idUser },
    });
    if (!user) return false;
    const notifications = await db.notificationbookings.findAll({
      where: { idUser: user.id },
      limit: 10,
      order: [["createdAt", "DESC"]],
    });

    console.log("notifications aa", notifications.length);
    if (!notifications) return false;
    return notifications;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const readNotification = async (id) => {
  try {
    const notification = await db.notificationbookings.findOne({
      where: { id },
    });
    if (!notification) return false;
    notification.isRead = true;
    await notification.save();
    return notification;
  } catch (error) {
    console.log(error);
    return false;
  }
};
module.exports = {
  pushNotification,
  getByUser,
  readNotification,
};
