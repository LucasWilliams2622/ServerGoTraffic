var express = require("express");
var router = express.Router();
const notificationBookingController = require("../../components/NotificationBooking/NotificationBookingController");
const db = require("../../components/indexModel");

//http://localhost:3000/notification-booking/api/wellcome
router.post("/wellcome", async (req, res) => {
  const { idUser } = req.query;
  const title = "Welcome to Go Traffic";
  const content = "Thank you for using our service";
  const image =
    "http://www.desicomments.com/wp-content/uploads/2017/02/Image-Of-Welcome.jpg";
  const notification = await notificationBookingController.pushNotification(
    idUser,
    title,
    content,
    image
  );
  if (notification) {
    return res
      .status(200)
      .json({ result: true, notification: notification, message: "Success" });
  } else {
    res.status(400).send("Get notification failed");
  }
});

//http://localhost:3000/notification-booking/api/get-by-user
router.get("/get-by-user", async (req, res) => {
  const { idUser } = req.query;
  const notifications = await notificationBookingController.getByUser(idUser);
  if (notifications) {
    return res
      .status(200)
      .json({ result: true, notifications: notifications, message: "Success" });
  } else {
    res.status(400).send("Get notification failed");
  }
});
//http://localhost:3000/notification-booking/api/unread-notification-count
router.get("/unread-notification-count", async (req, res) => {
  try {
    // Đếm số lượng thông báo chưa đọc trong bảng notificationBooking
    const count = await db.notificationbookings.count({
      where: { isRead: false },
    });
    if (count === null) {
      return res
        .status(201)
        .json({ result: true, count: 0, message: "Success" });
    }
    return res
      .status(200)
      .json({ result: true, count: count, message: "Success" });
  } catch (error) {
    console.error("Error fetching unread notification count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


//http://localhost:3000/notification-booking/api/read
router.post("/read", async (req, res) => {
  try {
    const { id } = req.query;
    const notification = await notificationBookingController.readNotification(
      id
    );
    if (notification) {
      return res
        .status(200)
        .json({ result: true, notification: notification, message: "Success" });
    } else {
      res.status(400).send("Delete notification failed");
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: NotificationBooking
 *   description: API for Review operations
 */

/**
 * @swagger
 * /notification-booking/api/wellcome:
 *   post:
 *     summary: Gửi thông báo chào mừng đến người dùng
 *     tags: [NotificationBooking]
 *     parameters:
 *       - in: query
 *         name: idUser
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của người dùng
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 notification:
 *                   type: object
 *                 message:
 *                   type: string
 *       400:
 *         description: Lấy thông báo thất bại
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
/**
 * @swagger
 * /notification-booking/api/get-by-user:
 *   get:
 *     summary: Lấy danh sách thông báo theo người dùng
 *     tags: [NotificationBooking]
 *     parameters:
 *       - in: query
 *         name: idUser
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của người dùng
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 notifications:
 *                   type: array
 *                   items:
 *                     type: object
 *                 message:
 *                   type: string
 *       400:
 *         description: Lấy thông báo thất bại
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
/**
 * @swagger
 * /notification-booking/api/read:
 *   post:
 *     summary: Read a notification by ID
 *     description: Retrieve a notification by its ID
 *     tags: [NotificationBooking]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the notification to be read
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               result: true
 *               notification:
 *                 // Define your notification schema here
 *               message: Success
 *       400:
 *         description: Delete notification failed
 */