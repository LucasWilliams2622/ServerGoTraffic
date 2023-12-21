var express = require("express");
var router = express.Router();
const reviewController = require("../../components/Transaction/TransactionController");


// http://localhost:3000/transaction/api/create
router.post("/create", async (req, res) => {
  try {
    const { idUser, amount, transactionType } = req.body;
    const transaction = await reviewController.createTransaction(
      idUser,
      amount,
      transactionType
    );
    if (transaction) {
      res
        .status(200)
        .json({ transaction, message: "Create transaction successfully" });
    } else {
      res.status(400).json({ message: "Create transaction failed" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});


// http://localhost:3000/transaction/api/get-by-id
router.get("/get-by-id", async (req, res) => {
  try {
    const { id } = req.query;
    const transaction = await reviewController.getTransactionById(id);
    if (transaction) {
      res
        .status(200)
        .json({ transaction, message: "Get transaction successfully" });
    } else {
      res.status(400).json({ message: "Get transaction failed" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// http://localhost:3000/transaction/api/get-all
router.get("/get-all", async (req, res) => {
  try {
    const transactions = await reviewController.getAllTransaction();
    if (transactions) {
      res
        .status(200)
        .json({ transactions, message: "Get transactions successfully" });
    } else {
      res.status(400).json({ message: "Get transactions failed" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// http://localhost:3000/transaction/api/get-by-id-user
router.get("/get-by-id-user", async (req, res) => {
  try {
    const { idUser } = req.query;
    const transactions = await reviewController.getTransactionByUserId(idUser);
    if (transactions) {
      res
        .status(200)
        .json({ transactions, message: "Get transactions successfully" });
    } else {
      res.status(400).json({ message: "Get transactions failed" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// http://localhost:3000/transaction/api/get-by-type
router.get("/get-by-type", async (req, res) => {
  try {
    const { type } = req.query;
    //recharge, withdraw
    const transactions = await reviewController.getTransactionByType(type);
    if (transactions) {
      res
        .status(200)
        .json({ transactions, message: "Get transactions successfully" });
    } else {
      res.status(400).json({ message: "Get transactions failed" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// http://localhost:3000/transaction/api/delete
router.delete("/delete", async (req, res) => {
  try {
    const { id } = req.query;
    const transaction = await reviewController.deleteTransactionById(id);
    if (transaction) {
      res
        .status(200)
        .json({ transaction, message: "Delete transaction successfully" });
    } else {
      res.status(400).json({ message: "Delete transaction failed" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Transaction
 *   description: APIs for managing transactions
 */

/**
 * @swagger
 * /transaction/api/create:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transaction]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUser:
 *                 type: string
 *               amount:
 *                 type: number
 *               transactionType:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 transaction:
 *                   $ref: '#/components/schemas/Transaction'
 *                 message:
 *                   type: string
 *       '400':
 *         description: Create transaction failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
/**
 * @swagger
 * /transaction/api/get-by-id:
 *   get:
 *     summary: Get transaction by ID
 *     tags: [Transaction]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 transaction:
 *                   $ref: '#/components/schemas/Transaction'
 *                 message:
 *                   type: string
 *       '400':
 *         description: Get transaction failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /transaction/api/get-all:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transaction]
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 transactions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Transaction'
 *                 message:
 *                   type: string
 *       '400':
 *         description: Get transactions failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /transaction/api/get-by-id-user:
 *   get:
 *     summary: Get transactions by user ID
 *     tags: [Transaction]
 *     parameters:
 *       - in: query
 *         name: idUser
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 transactions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Transaction'
 *                 message:
 *                   type: string
 *       '400':
 *         description: Get transactions failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /transaction/api/get-by-type:
 *   get:
 *     summary: Get transactions by type
 *     tags: [Transaction]
 *     parameters:
 *       - in: query
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 transactions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Transaction'
 *                 message:
 *                   type: string
 *       '400':
 *         description: Get transactions failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /transaction/api/delete:
 *   delete:
 *     summary: Delete transaction by ID
 *     tags: [Transaction]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 transaction:
 *                   $ref: '#/components/schemas/Transaction'
 *                 message:
 *                   type: string
 *       '400':
 *         description: Delete transaction failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */