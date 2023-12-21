var express = require("express");
var router = express.Router();
const carBrandController = require("../../components/CarBrand/CarBrandController");

//http://localhost:3000/car-brand/api/add
router.post("/add", async (req, res, next) => {
  try {
    const { name, key } = req.body;
    const brand = await carBrandController.add(name, key);
    if (brand) {
      return res
        .status(200)
        .json({ result: true, brand: brand, message: "Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, brand: null, message: " Failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, message: "Error System" });
  }
});

//http://localhost:3000/car-brand/api/list
router.get("/list", async (req, res, next) => {
  try {
    const brand = await carBrandController.list();
    if (brand) {
      return res
        .status(200)
        .json({ result: true, brand: brand, message: "Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, brand: null, message: " Failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, message: "Error System" });
  }
});

//http://localhost:3000/car-brand/api/delete
router.delete("/delete", async (req, res, next) => {
  try {
    const { id } = req.query;
    const brand = await carBrandController.deleteById(id);
    if (brand) {
      return res
        .status(200)
        .json({ result: true, brand: brand, message: "Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, brand: null, message: " Failed" });
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
 *   name: Car Brand
 *   description: API for Car operations
 */


/**
 * @swagger
 * /car-brand/api/add:
 *   post:
 *     summary: Add a new car brand
 *     tags: [Car Brand]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               key:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 brand:
 *                   $ref: '#/components/schemas/CarBrand'
 *                 message:
 *                   type: string
 *       400:
 *         description: Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 brand:
 *                   type: null
 *                 message:
 *                   type: string
 *       500:
 *         description: Error System
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
 * /car-brand/api/list:
 *   get:
 *     summary: Get the list of car brands
 *     tags: [Car Brand]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 brand:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CarBrand'
 *                 message:
 *                   type: string
 *       400:
 *         description: Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 brand:
 *                   type: null
 *                 message:
 *                   type: string
 *       500:
 *         description: Error System
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
 * /car-brand/api/delete:
 *   delete:
 *     summary: Delete a car brand by ID
 *     tags: [Car Brand]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the car brand
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 brand:
 *                   $ref: '#/components/schemas/CarBrand'
 *                 message:
 *                   type: string
 *       400:
 *         description: Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 brand:
 *                   type: null
 *                 message:
 *                   type: string
 *       500:
 *         description: Error System
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
