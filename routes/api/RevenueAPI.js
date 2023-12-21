var express = require("express");
var router = express.Router();
const revenueController = require("../../components/Revenue/RevenueController");

//http://localhost:3000/revenue/api/add
router.post("/add", async (req, res) => {
  const { idBooking } = req.body;
  const result = await revenueController.addRevenue(idBooking);
  if (result) {
    res.status(200).json({
      message: "Add revenue successfully",
    });
  } else {
    res.status(400).json({
      message: "Add revenue failed",
    });
  }
});

router.delete("/delete", async (req, res) => {
  const { id } = req.body;
  const result = await revenueController.deleteRevenue(id);
  if (result) {
    res.status(200).json({
      message: "Delete revenue successfully",
    });
  }
  else {
    res.status(400).json({
      message: "Delete revenue failed",
    });
  }
});


//http://localhost:3000/revenue/api/total-all-revenue
router.get("/total-all-revenue", async (req, res) => {
  const result = await revenueController.getAllRevenue();
  if (result) {
    res.status(200).json({
      message: "Get all revenue successfully",
      data: result,
    });
  } else {
    res.status(400).json({
      message: "Get all revenue failed",
    });
  }
});

//http://localhost:3000/revenue/api/get-by-id
router.get("/get-by-id", async (req, res) => {
  const { id } = req.body;
  const result = await revenueController.getRevenueById(id);
  if (result) {
    res.status(200).json({
      message: "Get revenue by id successfully",
      data: result,
    });
  } else {
    res.status(400).json({
      message: "Get revenue by id failed",
    });
  }
});

//http://localhost:3000/revenue/api/get-by-id-booking
router.get("/get-by-id-booking", async (req, res) => {
  const { idBooking } = req.body;
  const result = await revenueController.getRevenueByIdBooking(idBooking);
  if (result) {
    res.status(200).json({
      message: "Get revenue by id booking successfully",
      data: result,
    });
  } else {
    res.status(400).json({
      message: "Get revenue by id booking failed",
    });
  }
});

//http://localhost:3000/revenue/api/get-by-date-range
router.get("/get-by-date-range", async (req, res) => {
  const { startDate, endDate } = req.body;
  const result = await revenueController.getRevenueByDateRange(
    startDate,
    endDate
  );
  if (result) {
    res.status(200).json({
      message: "Get revenue by date range successfully",
      data: result,
    });
  } else {
    res.status(400).json({
      message: "Get revenue by date range failed",
    });
  }
});

//http://localhost:3000/revenue/api/get-highest-revenue
router.get("/get-highest-revenue", async (req, res) => {
  const result = await revenueController.getHighestRevenue();
  if (result) {
    res.status(200).json({
      message: "Get highest revenue successfully",
      data: result,
    });
  } else {
    res.status(400).json({
      message: "Get highest revenue failed",
    });
  }
});

//http://localhost:3000/revenue/api/get-lowest-revenue
router.get("/get-lowest-revenue", async (req, res) => {
  const result = await revenueController.getLowestRevenue();
  if (result) {
    res.status(200).json({
      message: "Get lowest revenue successfully",
      data: result,
    });
  } else {
    res.status(400).json({
      message: "Get lowest revenue failed",
    });
  }
});

//http://localhost:3000/revenue/api/get-average-revenue
router.get("/get-average-revenue", async (req, res) => {
  const result = await revenueController.getAverageRevenue();
  if (result) {
    res.status(200).json({
      message: "Get average revenue successfully",
      data: result,
    });
  } else {
    res.status(400).json({
      message: "Get average revenue failed",
    });
  }
});

//http://localhost:3000/revenue/api/get-average-revenue-range-date
router.get("/get-average-revenue-range-date", async (req, res) => {
  const { startDate, endDate } = req.body;
  const result = await revenueController.getAverageRevenueArangeDate(startDate, endDate);
  if (result) {
    res.status(200).json({
      message: "Get average revenue successfully",
      data: result,
    });
  } else {
    res.status(400).json({
      message: "Get average revenue failed",
    });
  }
});

module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Revenue
 *   description: Revenue related operations
 */

/**
 * @swagger
 * /revenue/api/add:
 *   post:
 *     summary: Add revenue
 *     tags: [Revenue]
 *     description: Add revenue for a booking.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idBooking:
 *                 type: string
 *             example:
 *               idBooking: "12345"
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Add revenue successfully
 *       400:
 *         description: Failed response
 *         content:
 *           application/json:
 *             example:
 *               message: Add revenue failed
 *     security:
 *       - apiKey: []
 */
/**
 * @swagger
 * /revenue/api/total-all-revenue:
 *   get:
 *     summary: Get total revenue for all bookings
 *     tags: [Revenue]
 *     description: Retrieve the total revenue for all bookings.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Get all revenue successfully
 *               data:
 *                 // Include sample total revenue response here
 *       400:
 *         description: Failed response
 *         content:
 *           application/json:
 *             example:
 *               message: Get all revenue failed
 *     security:
 *       - apiKey: []
 */
/**
 * @swagger
 * /revenue/api/get-by-id:
 *   get:
 *     summary: Get revenue by ID
 *     tags: [Revenue]
 *     description: Retrieve revenue information by ID.
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         description: ID of the revenue record
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Get revenue by ID successfully
 *               data:
 *                 // Include sample revenue by ID response here
 *       400:
 *         description: Failed response
 *         content:
 *           application/json:
 *             example:
 *               message: Get revenue by ID failed
 *     security:
 *       - apiKey: []
 */
/**
 * @swagger
 * /revenue/api/get-by-id-booking:
 *   get:
 *     summary: Get revenue by ID Booking
 *     tags: [Revenue]
 *     description: Retrieve revenue information by ID Booking.
 *     parameters:
 *       - name: idBooking
 *         in: query
 *         required: true
 *         description: ID of the booking for which revenue information is requested
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Get revenue by ID Booking successfully
 *               data:
 *                 // Include sample revenue by ID Booking response here
 *       400:
 *         description: Failed response
 *         content:
 *           application/json:
 *             example:
 *               message: Get revenue by ID Booking failed
 *     security:
 *       - apiKey: []
 */
/**
 * @swagger
 * /revenue/api/get-highest-revenue:
 *   get:
 *     summary: Get highest revenue
 *     tags: [Revenue]
 *     description: Retrieve information about the booking with the highest revenue.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Get highest revenue successfully
 *               data:
 *                 // Include sample highest revenue response here
 *       400:
 *         description: Failed response
 *         content:
 *           application/json:
 *             example:
 *               message: Get highest revenue failed
 *     security:
 *       - apiKey: []
 */

/**
 * @swagger
 * /revenue/api/get-lowest-revenue:
 *   get:
 *     summary: Get lowest revenue
 *     tags: [Revenue]
 *     description: Retrieve information about the booking with the lowest revenue.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Get lowest revenue successfully
 *               data:
 *                 // Include sample lowest revenue response here
 *       400:
 *         description: Failed response
 *         content:
 *           application/json:
 *             example:
 *               message: Get lowest revenue failed
 *     security:
 *       - apiKey: []
 */
/**
 * @swagger
 * /revenue/api/get-average-revenue:
 *   get:
 *     summary: Get average revenue
 *     tags: [Revenue]
 *     description: Retrieve the average revenue for all bookings.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Get average revenue successfully
 *               data:
 *                 // Include sample average revenue response here
 *       400:
 *         description: Failed response
 *         content:
 *           application/json:
 *             example:
 *               message: Get average revenue failed
 *     security:
 *       - apiKey: []
 */

/**
 * @swagger
 * /revenue/api/get-average-revenue-range-date:
 *   get:
 *     summary: Get average revenue within date range
 *     tags: [Revenue]
 *     description: Retrieve the average revenue for bookings within a specified date range.
 *     parameters:
 *       - name: startDate
 *         in: query
 *         required: true
 *         description: Start date for the range (YYYY-MM-DD)
 *         schema:
 *           type: string
 *       - name: endDate
 *         in: query
 *         required: true
 *         description: End date for the range (YYYY-MM-DD)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Get average revenue successfully
 *               data:
 *                 // Include sample average revenue within date range response here
 *       400:
 *         description: Failed response
 *         content:
 *           application/json:
 *             example:
 *               message: Get average revenue failed
 *     security:
 *       - apiKey: []
 */
  