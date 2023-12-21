const notificationService = require("./NotificationBookingService");

const pushNotification = async (idUser, title, content, image) => {
  return await notificationService.pushNotification(
    idUser,
    title,
    content,
    image
  );
};

const getByUser = async (idUser) => {
  try {
    return await notificationService.getByUser(idUser);
  } catch (error) {
    console.log(error);
    return false;
  }
};

const readNotification = async (id) => {
  try {
    return await notificationService.readNotification(id);
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
