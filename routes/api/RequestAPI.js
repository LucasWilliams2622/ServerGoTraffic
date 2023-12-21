var express = require("express");
var router = express.Router();
const reviewController = require("../../components/Request/RequestController");

//http://localhost:3000/request/api/get-all
router.get("/get-all", async (req, res) => {
  const result = await reviewController.getAllRequest();
  if (result === false) {
    return res.status(500).json({
      message: "Server error",
    });
  } else if (result === null) {
    return res.status(404).json({
      message: "Request not found",
    });
  } else {
    return res.status(200).json(result);
  }
});

//http://localhost:3000/request/api/get-by-id?id=1
router.get("/get-by-id", async (req, res) => {
  const id = req.query.id;
  const result = await reviewController.getRequestById(id);
  if (result) {
    return res.status(200).json(result);
  }
  return res.status(404).json({
    message: "Request not found",
  });
});

//http://localhost:3000/request/api/add
router.post("/add", async (req, res) => {
  try {
    const { idUser, bankName, bankNumber, amount } = req.body;
    console.log(req.body);
    const result = await reviewController.createRequest(
      idUser,
      bankName,
      bankNumber,
      amount
    );
    if (result) {
      return res
        .status(200)
        .json({ result: true, message: "Create request successfully" });
    } else {
      return res
        .status(400)
        .json({ result: false, message: "Create request failed" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
});

//http://localhost:3000/request/api/accpet?id=1
router.put("/accpet", async (req, res) => {
  const id = req.query.id;
  const result = await reviewController.accpetRequest(id);
  if (result) {
    return res.status(200).json({
      message: "Accpet request successfully",
    });
  }
  return res.status(404).json({
    message: "Request not found",
  });
});

//http://localhost:3000/request/api/reject?id=1
router.put("/reject", async (req, res) => {
  const id = req.query.id;
  const result = await reviewController.rejectRequest(id);
  if (result) {
    return res.status(200).json({
      message: "Reject request successfully",
    });
  }
  return res.status(404).json({
    message: "Request not found",
  });
});

//http://localhost:3000/request/api/delete?id=1
router.delete("/delete", async (req, res) => {
  const id = req.query.id;
  const result = await reviewController.deleteRequest(id);
  if (result) {
    return res.status(200).json({
      message: "Delete request successfully",
    });
  }
  return res.status(404).json({
    message: "Request not found",
  });
});

//http://localhost:3000/request/api/list-request-by-user?idUser=1
router.get("/list-request-by-user", async (req, res) => {
  const idUser = req.query.idUser;
  const result = await reviewController.getListRequestByUser(idUser);
  if (result) {
    return res.status(200).json(result);
  }
  return res.status(404).json({
    message: "Request not found",
  });
});

//http://localhost:3000/request/api/list-reject-request-by-user?idUser=1
router.get("/list-reject-request-by-user", async (req, res) => {
  const idUser = req.query.idUser;
  const result = await reviewController.getListRejectRequestByUser(idUser);
  if (result) {
    return res.status(200).json(result);
  }
  return res.status(404).json({
    message: "Request not found",
  });
});

//http://localhost:3000/request/api/list-accpet-request-by-user?idUser=1
router.get("/list-accpet-request-by-user", async (req, res) => {
  const idUser = req.query.idUser;
  const result = await reviewController.getListAccpetRequestByUser(idUser);
  if (result) {
    return res.status(200).json(result);
  }
  return res.status(404).json({
    message: "Request not found",
  });
});

//http://localhost:3000/request/api/list-reject
router.get("/list-reject", async (req, res) => {
  const result = await reviewController.getListReject();
  if (result) {
    return res.status(200).json(result);
  }
  return res.status(404).json({
    message: "Request not found",
  });
});





module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Request
 *   description: API for Request Withdraw Money operations
 */

/**
 * @swagger
 * /request/api/get-all:
 *   get:
 *     summary: Get all requests
 *     tags: [Request]
 *     responses:
 *       200:
 *         description: A list of all requests
 *       404:
 *         description: Request not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /request/api/get-by-id:
 *   get:
 *     summary: Get request by ID
 *     tags: [Request]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the request
 *     responses:
 *       200:
 *         description: The requested item
 *       404:
 *         description: Request not found
 */


/**
 * @swagger
 * /request/api/add:
 *   post:
 *     summary: Add a new request
 *     tags: [Request]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUser:
 *                 type: string
 *               bankName:
 *                 type: string
 *               bankNumber:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Create request successfully
 *       400:
 *         description: Create request failed
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /request/api/accpet:
 *   put:
 *     summary: Accept a request
 *     tags: [Request]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Accept request successfully
 *       404:
 *         description: Request not found
 */
/**
 * @swagger
 * /request/api/reject:
 *   put:
 *     summary: Reject a request
 *     tags: [Request]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reject request successfully
 *       404:
 *         description: Request not found
 */
/**
 * @swagger
 * /request/api/delete:
 *   delete:
 *     summary: Delete a request
 *     tags: [Request]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Delete request successfully
 *       404:
 *         description: Request not found
 */

/**
 * @swagger
 * /request/api/list-request-by-user:
 *   get:
 *     summary: Get list of requests by user
 *     tags: [Request]
 *     parameters:
 *       - in: query
 *         name: idUser
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of requests
 *       404:
 *         description: Request not found
 */

/**
 * @swagger
 * /request/api/list-reject-request-by-user:
 *   get:
 *     summary: Get list of rejected requests by user
 *     tags: [Request]
 *     parameters:
 *       - in: query
 *         name: idUser
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of rejected requests
 *       404:
 *         description: Request not found
 */

/**
 * @swagger
 * /request/api/list-accpet-request-by-user:
 *   get:
 *     summary: Get list of accepted requests by user
 *     tags: [Request]
 *     parameters:
 *       - in: query
 *         name: idUser
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of accepted requests
 *       404:
 *         description: Request not found
 */

/**
 * @swagger
 * /request/api/list-reject:
 *   get:
 *     summary: Get list of rejected requests
 *     tags: [Request]
 *     responses:
 *       200:
 *         description: List of rejected requests
 *       404:
 *         description: Request not found
 */