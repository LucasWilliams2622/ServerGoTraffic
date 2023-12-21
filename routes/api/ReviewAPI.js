var express = require("express");
var router = express.Router();
const reviewController = require("../../components/Review/ReviewController");

//http://localhost:3000/review/api/add
router.post("/add", async (req, res, next) => {
  try {
    const { idBooking, timeReview, content, rating } = req.body;
    const review = await reviewController.add(
      idBooking,
      timeReview,
      content,
      rating
    );
    if (review) {
      return res
        .status(200)
        .json({ result: true, review: review, message: "Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, review: null, message: " Failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, message: "Error System" });
  }
});

//http://localhost:3000/review/api/list
router.get("/list", async (req, res, next) => {
  try {
    const { page, size } = req.query;
    const reviews = await reviewController.list(page, size);
    if (reviews) {
      return res
        .status(200)
        .json({ result: true, reviews: reviews, message: "Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, reviews: null, message: " Failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, message: "Error System" });
  }
});

//http://localhost:3000/review/api/delete
router.delete("/delete", async (req, res, next) => {
  try {
    const { id } = req.query;
    const review = await reviewController.deleteById(id);
    if (review) {
      return res
        .status(200)
        .json({ result: true, review: review, message: "Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, review: null, message: " Failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, message: "Error System" });
  }
});

//http://localhost:3000/review/api/update
router.put("/update", async (req, res, next) => {
  try {
    const { id, idBooking, timeReview, content, rating } = req.body;
    const review = await reviewController.updateById(
      id,
      idBooking,
      timeReview,
      content,
      rating
    );
    if (review) {
      return res
        .status(200)
        .json({ result: true, review: review, message: "Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, review: null, message: " Failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, message: "Error System" });
  }
});

//http://localhost:3000/review/api/get-by-id
router.get("/get-by-id", async (req, res, next) => {
  try {
    const { id } = req.query;
    const review = await reviewController.getById(id);
    if (review) {
      return res
        .status(200)
        .json({ result: true, review: review, message: "Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, review: null, message: " Failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, message: "Error System" });
  }
});

//http://localhost:3000/review/api/get-by-id-booking
router.get("/get-by-id-booking", async (req, res, next) => {
  try {
    const { idBooking } = req.query;
    const review = await reviewController.getByBookingId(idBooking);
    if (review) {
      return res
        .status(200)
        .json({ result: true, review: review, message: "Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, review: null, message: " Failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, message: "Error System" });
  }
});

//http://localhost:3000/review/api/get-by-id-user
router.get("/get-by-id-user", async (req, res, next) => {
  try {
    const { idUser } = req.query;
    const review = await reviewController.getByUserId(idUser);
    if (review) {
      return res
        .status(200)
        .json({ result: true, review: review, message: "Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, review: null, message: " Failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, message: "Error System" });
  }
});

//http://localhost:3000/review/api/get-by-id-car
router.get("/get-by-id-car", async (req, res, next) => {
  try {
    const { idCar } = req.query;
    const review = await reviewController.getByIdCar(idCar);
    if (review) {
      return res
        .status(200)
        .json({ result: true, review: review, message: "Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, review: null, message: " Failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, message: "Error System" });
  }
});

//http://localhost:3000/review/api/sort-by-rating
router.get("/sort-by-rating", async (req, res, next) => {
  try {
    const { page, size } = req.query;
    const reviews = await reviewController.sortByRating(page, size);
    if (reviews) {
      return res
        .status(200)
        .json({ result: true, reviews: reviews, message: "Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, reviews: null, message: " Failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, message: "Error System" });
  }
});

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Review
 *   description: API for Review operations
 */

/**
 * @swagger
 * /review/api/add:
 *   post:
 *     tags:
 *       - Review
 *     summary: Add a new review
 *     description: Add a new review with booking ID, time of review, content, and rating
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idBooking:
 *                 type: string
 *               timeReview:
 *                 type: string
 *               content:
 *                 type: string
 *               rating:
 *                 type: object
 *             example:
 *               idBooking: "12345"
 *               timeReview: "2023-11-05"
 *               content: "This is a great experience!"
 *               rating:
 *                 cleanliness: 5
 *                 service: 4
 *                 location: 5
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *             review:
 *               type: object
 *             message:
 *               type: string
 *       400:
 *         description: Failed
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *             review:
 *               type: null
 *             message:
 *               type: string
 *       500:
 *         description: Server error
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *             message:
 *               type: string
 */
/**
 * @swagger
 * /review/api/list:
 *   get:
 *     tags:
 *       - Review
 *     summary: Get a list of reviews
 *     description: Get a paginated list of reviews
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number
 *         required: false
 *         schema:
 *           type: integer
 *       - name: size
 *         in: query
 *         description: Number of reviews per page
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *             reviews:
 *               type: array
 *               items:
 *                 type: object
 *             message:
 *               type: string
 *       400:
 *         description: Failed
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *             reviews:
 *               type: null
 *             message:
 *               type: string
 *       500:
 *         description: Server error
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *             message:
 *               type: string
 */
/**
 * @swagger
 * /review/api/delete:
 *   delete:
 *     tags:
 *       - Review
 *     summary: Delete a review
 *     description: Delete a review by ID
 *     parameters:
 *       - name: id
 *         in: query
 *         description: Review ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *             review:
 *               type: object
 *             message:
 *               type: string
 *       400:
 *         description: Failed
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *             review:
 *               type: null
 *             message:
 *               type: string
 *       500:
 *         description: Server error
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *             message:
 *               type: string
 */
/**
 * @swagger
 * /review/api/update:
 *   put:
 *     tags:
 *       - Review
 *     summary: Update a review
 *     description: Update a review by ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               idBooking:
 *                 type: string
 *               timeReview:
 *                 type: string
 *               content:
 *                 type: string
 *               rating:
 *                 type: object
 *             example:
 *               id: "12345"
 *               idBooking: "54321"
 *               timeReview: "2023-11-05"
 *               content: "This is an updated review!"
 *               rating:
 *                 cleanliness: 4
 *                 service: 5
 *                 location: 4
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *             review:
 *               type: object
 *             message:
 *               type: string
 *       400:
 *         description: Failed
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *             review:
 *               type: null
 *             message:
 *               type: string
 *       500:
 *         description: Server error
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *             message:
 *               type: string
 */
/**
 * @swagger
 * /review/api/get-by-id:
 *   get:
 *     tags:
 *       - Review
 *     summary: Get review by ID
 *     description: Get a review by its ID
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID of the review
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *             review:
 *               $ref: "#/definitions/Review"
 *             message:
 *               type: string
 *       400:
 *         description: Failed
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *             review:
 *               type: null
 *             message:
 *               type: string
 *       500:
 *         description: Server error
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *             message:
 *               type: string
 */
/**
 * @swagger
 * /review/api/get-by-id-booking:
 *   get:
 *     tags:
 *       - Review
 *     summary: Get review by booking ID
 *     description: Get a review by the ID of the booking it belongs to
 *     parameters:
 *       - name: idBooking
 *         in: query
 *         description: ID of the booking
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *             review:
 *               $ref: "#/definitions/Review"
 *             message:
 *               type: string
 *       400:
 *         description: Failed
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *             review:
 *               type: null
 *             message:
 *               type: string
 *       500:
 *         description: Server error
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *             message:
 *               type: string
 */
/**
 * @swagger
 * /review/api/get-by-id-user:
 *   get:
 *     tags:
 *       - Review
 *     summary: Get review by user ID
 *     description: Get a review by the ID of the user who made the review
 *     parameters:
 *       - name: idUser
 *         in: query
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *             review:
 *               $ref: "#/definitions/Review"
 *             message:
 *               type: string
 *       400:
 *         description: Failed
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *             review:
 *               type: null
 *             message:
 *               type: string
 *       500:
 *         description: Server error
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *             message:
 *               type: string
 */
/**
 * @swagger
 * /review/api/get-by-id-car:
 *   get:
 *     tags:
 *       - Review
 *     summary: Get review by car ID
 *     description: Get a review by the ID of the car that was reviewed
 *     parameters:
 *       - name: idCar
 *         in: query
 *         description: ID of the car
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *             review:
 *               $ref: "#/definitions/Review"
 *             message:
 *               type: string
 *       400:
 *         description: Failed
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *             review:
 *               type: null
 *             message:
 *               type: string
 *       500:
 *         description: Server error
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *             message:
 *               type: string
 */
/**
 * @swagger
 * /review/api/sort-by-rating:
 *   get:
 *     tags:
 *       - Review
 *     summary: Sort reviews by rating
 *     description: Get a list of reviews sorted by their rating
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number
 *         required: true
 *         schema:
 *           type: integer
 *       - name: size
 *         in: query
 *         description: Number of reviews per page
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *             reviews:
 *               type: array
 *               items:
 *                 $ref: "#/definitions/Review"
 *             message:
 *               type: string
 *       400:
 *         description: Failed
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *             reviews:
 *               type: null
 *             message:
 *               type: string
 *       500:
 *         description: Server error
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *             message:
 *               type: string
 */
