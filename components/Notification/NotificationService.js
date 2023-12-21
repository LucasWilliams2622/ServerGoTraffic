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

const pushNotification = async (title, content, image) => {
  try {
    const notification = await db.notifications.create({
      title,
      content,
      image,
      isRead: false,
    });
    if (!notification) return false;
    console.log("notification", notification);
    return notification;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getNotification = async () => {
  try {
    const notification = await NotificationModel.findAll({
      limit: 10,
      order: [["createdAt", "DESC"]],
    });
    return notification;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const deleteNotification = async (id) => {
  try {
    const notification = await NotificationModel.destroy({
      where: { id: id },
    });
    return notification;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const readNotification = async (id) => {
  try {
    const notification = await NotificationModel.update(
      { isRead: true },
      { where: { id: id } }
    );
    return notification;
  } catch (error) {
    console.log(error);
    return false;
  }
};
module.exports = {
  pushNotification,
  getNotification,
  deleteNotification,
  readNotification,
};
