var express = require("express");
var router = express.Router();
const favoriteCarController = require("../../components/FavoriteCar/FavotiteCarController");

//http://localhost:3000/favorite-car/api/add
router.post("/add", async (req, res, next) => {
  try {
    const { idUser, idCar } = req.query;
    const car = await favoriteCarController.add(idUser, idCar);
    if (car == 1) {
      return res.status(200).json({ result: false, message: "Đã tồn tại" });
    }
    if (car == 2) {
      return res.status(200).json({ result: true, message: "Thêm thành công" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, message: "Error System" });
  }
});

//http://localhost:3000/favorite-car/api/list
router.get("/list", async (req, res, next) => {
  try {
    const { page, size } = req.query;
    const list = await favoriteCarController.list(page, size);
    return res.status(200).json({ result: true, data: list });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, message: "Error System" });
  }
});

//http://localhost:3000/favorite-car/api/delete
router.delete("/delete", async (req, res, next) => {
  try {
    const { idUser, idCar } = req.query;
    const car = await favoriteCarController.deleteById(idUser, idCar);
    if (car) {
      return res.status(200).json({ result: true, message: "Xóa thành công" });
    }
    return res.status(200).json({ result: false, message: "Xóa thất bại" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, message: "Error System" });
  }
});

//http://localhost:3000/favorite-car/api/list-by-user
router.get("/list-by-user", async (req, res, next) => {
  try {
    const { idUser } = req.query;
    const list = await favoriteCarController.listByUser(idUser);
    return res.status(200).json({ result: true, data: list });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, message: "Error System" });
  } 
});
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: FavoriteCar
 *   description: API for FavoriteCar operations
 */
/**
 * @swagger
 * /favorite-car/api/add:
 *   post:
 *     summary: Add a car to favorites
 *     tags: [FavoriteCar]
 *     parameters:
 *       - in: query
 *         name: idUser
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *       - in: query
 *         name: idCar
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the car
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
/**
 * @swagger
 * /favorite-car/api/list:
 *   get:
 *     summary: Get the list of FavoriteCars
 *     tags: [FavoriteCar]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         required: false
 *         description: The page number
 *       - in: query
 *         name: size
 *         schema:
 *           type: number
 *         required: false
 *         description: The number of items per page
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/FavoriteCar'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
/**
 * @swagger
 * /favorite-car/api/delete:
 *   delete:
 *     summary: Delete a car from favorites
 *     tags: [FavoriteCar]
 *     parameters:
 *       - in: query
 *         name: idUser
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *       - in: query
 *         name: idCar
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the car
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
/**
 * @swagger
 * /favorite-car/api/list-by-user:
 *   get:
 *     summary: Get the list of FavoriteCars by user ID
 *     tags: [FavoriteCar]
 *     parameters:
 *       - in: query
 *         name: idUser
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/FavoriteCar'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
