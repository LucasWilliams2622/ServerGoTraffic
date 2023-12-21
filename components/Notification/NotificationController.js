const notificationService = require("./NotificationService");

const pushNotification = async (title, content, image) => {
  try {
    return await notificationService.pushNotification(title, content, image);
  } catch (e) {
    console.log(e);
  }
};

const getNotification = async (req, res) => {
  try {
    return await notificationService.getNotification();
  } catch (e) {
    console.log(e);
  }
};

const deleteNotification = async (id) => {
  try {
    return await notificationService.deleteNotification(id);
  } catch (e) {
    console.log(e);
  }
};

const readNotification = async (id) => {
  try {
    return await notificationService.readNotification(id);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  pushNotification,
  getNotification,
  deleteNotification,
  readNotification,
};
