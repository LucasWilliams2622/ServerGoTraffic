var express = require("express");
var router = express.Router();
const BookingController = require("../../components/Booking/BookingController");

// http://localhost:3000/booking/api/add
router.post("/add", async function (req, res, next) {
  try {
    const { idUser, idCar, timeFrom, timeTo, totalMoney, location } = req.body;
    console.log(req.body);
    const booking = await BookingController.add({
      idUser,
      idCar,
      timeFrom,
      timeTo,
      totalMoney,
      location,
    });
    if (booking === false) {
      return res
        .status(400)
        .json({ result: false, booking: null, message: "Số dư không đủ, Vui lòng nạp thêm !" });
    }
    return res
      .status(200)
      .json({ result: true, booking: booking, message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// http://localhost:3000/booking/api/accept
router.post("/accept", async function (req, res, next) {
  try {
    const { id } = req.query;
    const booking = await BookingController.accept(id);
    if (booking === false) {
      return res
        .status(201)
        .json({ result: false, booking: null, message: "Fail" });
    }
    return res
      .status(200)
      .json({ result: true, booking: booking, message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// http://localhost:3000/booking/api/delivering
router.post("/delivering", async function (req, res, next) {
  try {
    const { id } = req.query;
    const booking = await BookingController.delivering(id);
    if (booking === false) {
      return res
        .status(400)
        .json({ result: false, booking: null, message: "Fail" });
    }
    return res
      .status(200)
      .json({ result: true, booking: booking, message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// http://localhost:3000/booking/api/receive
router.post("/receive", async function (req, res, next) {
  try {
    const { id } = req.query;
    const booking = await BookingController.receive(id);
    if (booking === false) {
      return res
        .status(201)
        .json({ result: false, booking: null, message: "Fail" });
    }
    return res
      .status(200)
      .json({ result: true, booking: booking, message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// http://localhost:3000/booking/api/return-car
router.post("/return-car", async function (req, res, next) {
  try {
    const { id } = req.query;
    const booking = await BookingController.returnCar(id);
    if (booking === false) {
      return res
        .status(201)
        .json({ result: false, booking: null, message: "Fail" });
    }
    return res
      .status(200)
      .json({ result: true, booking: booking, message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
// http://localhost:3000/booking/api/complete
router.post("/complete", async function (req, res, next) {
  try {
    const { id } = req.query;
    const booking = await BookingController.complete(id);
    if (booking === false) {
      return res
        .status(201)
        .json({ result: false, booking: null, message: "Fail" });
    }
    return res
      .status(200)
      .json({ result: true, booking: booking, message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// http://localhost:3000/booking/api/reject
router.post("/reject", async function (req, res, next) {
  try {
    const { id } = req.query;
    const booking = await BookingController.reject(id);
    if (booking === false) {
      return res
        .status(201)
        .json({ result: false, booking: null, message: "Fail" });
    }
    return res
      .status(200)
      .json({ result: true, booking: booking, message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// http://localhost:3000/booking/api/get-by-id
router.get("/get-by-id", async function (req, res, next) {
  try {
    const { id } = req.query;
    const booking = await BookingController.getById(id);
    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// http://localhost:3000/booking/api/get-all
router.get("/get-all", async function (req, res, next) {
  try {
    const booking = await BookingController.getAll();
    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// http://localhost:3000/booking/api/get-by-user-id
router.get("/get-by-owner-id", async function (req, res, next) {
  try {
    const { idUser } = req.query;
    console.log(idUser);
    const booking = await BookingController.getByOwnerId(idUser);
    if (booking === false) {
      return res
        .status(201)
        .json({ result: false, booking: null, message: "Fail" });
    } else return res.status(200).json({ result: true, booking: booking, message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// http://localhost:3000/booking/api/get-history-by-id-user
router.get("/get-history-by-id-user", async function (req, res, next) {
  try {
    const { idUser } = req.query;
    console.log(idUser);
    const booking = await BookingController.getByRenterId(idUser);
    if (booking === false) {
      return res
        .status(201)
        .json({ result: false, booking: null, message: "Fail" });
    } else return res.status(200).json({ result: true, booking: booking, message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// http://localhost:3000/booking/api/cancel
router.post("/cancel", async function (req, res, next) {
  try {
    const { id } = req.query;
    const booking = await BookingController.cancel(id);
    if (booking === false) {
      return res
        .status(201)
        .json({ result: false, booking: null, message: "Fail" });
    }
    return res
      .status(200)
      .json({ result: true, booking: booking, message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
// http://localhost:3000/booking/api/cancel-by-owner?id=1
router.post("/cancel-by-owner", async function (req, res, next) {
  try {
    const { id } = req.query;
    const booking = await BookingController.cancelByOwner(id);
    if (booking === false) {
      return res
        .status(201)
        .json({ result: false, booking: null, message: "Fail" });
    }
    return res
      .status(200)
      .json({ result: true, booking: booking, message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// http://localhost:3000/booking/api/get-list-pending?idOwner=1
router.get("/get-list-pending", async function (req, res, next) {
  try {
    const { idOwner } = req.query;
    const booking = await BookingController.getListPending(idOwner);
    if (booking === false) {
      return res
        .status(201)
        .json({ result: false, booking: null, message: "Fail" });
    }
    return res
      .status(200)
      .json({ result: true, booking: booking, message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// http://localhost:3000/booking/api/get-list-accepted?idOwner=1
router.get("/get-list-accepted", async function (req, res, next) {
  try {
    const { idOwner } = req.query;
    const booking = await BookingController.getListAccepted(idOwner);
    if (booking === false) {
      return res
        .status(201)
        .json({ result: false, booking: null, message: "Fail" });
    }
    return res
      .status(200)
      .json({ result: true, booking: booking, message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//http://localhost:3000/booking/api/get-list-during?idOwner=1
router.get("/get-list-during", async function (req, res, next) {
  try {
    const { idOwner } = req.query;
    const booking = await BookingController.getListDuring(idOwner);
    console.log(booking);
    if (booking === false) {
      return res

        .status(201)
        .json({ result: false, booking: null, message: "Fail" });
    }
    return res
      .status(200)
      .json({ result: true, booking: booking, message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// http://localhost:3000/booking/api/get-list-complete?idOwner=1
router.get("/get-list-complete", async function (req, res, next) {
  try {
    const { idOwner } = req.query;
    const booking = await BookingController.getListComplete(idOwner);
    if (booking === false) {
      return res
        .status(201)
        .json({ result: false, booking: null, message: "Fail" });
    }
    return res
      .status(200)
      .json({ result: true, booking: booking, message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
// http://localhost:3000/booking/api/get-list-cancel?idOwner=1
router.get("/get-list-cancel", async function (req, res, next) {
  try {
    const { idOwner } = req.query;
    const booking = await BookingController.getListCancel(idOwner);
    if (booking === false) {
      return res
        .status(201)
        .json({ result: false, booking: null, message: "Fail" });
    }
    return res
      .status(200)
      .json({ result: true, booking: booking, message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// http://localhost:3000/booking/api/get-list-current-booking-of-user?idUser=1
router.get(
  "/get-list-current-booking-of-user",
  async function (req, res, next) {
    try {
      const { idUser } = req.query;
      const booking = await BookingController.getListCurrentOfUser(idUser);
      if (booking === false) {
        return res
          .status(201)
          .json({ result: false, booking: null, message: "Fail" });
      }
      return res
        .status(200)
        .json({ result: true, booking: booking, message: "Success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

//http://localhost:3000/booking/api/get-list-cancel-of-user?idUser=1
router.get("/get-list-cancel-of-user", async function (req, res, next) {
  try {
    const { idUser } = req.query;
    const booking = await BookingController.getListCancelOfUser(idUser);
    if (booking === false) {
      return res
        .status(201)
        .json({ result: false, booking: null, message: "Fail" });
    }
    return res
      .status(200)
      .json({ result: true, booking: booking, message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//http://localhost:3000/booking/api/get-list-complete-of-user?idUser=1
router.get("/get-list-complete-of-user", async function (req, res, next) {
  try {
    const { idUser } = req.query;
    const booking = await BookingController.getListCompleteOfUser(idUser);
    if (booking === false) {
      return res
        .status(201)
        .json({ result: false, booking: null, message: "Fail" });
    }
    return res
      .status(200)
      .json({ result: true, booking: booking, message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//http://localhost:3000/booking/api/get-list-cancel-of-owner?idOwner=1
router.get("/get-list-cancel-of-owner", async function (req, res, next) {
  try {
    const { idOwner } = req.query;
    const booking = await BookingController.getListCancelOfOwner(idOwner);
    if (booking === false) {
      return res
        .status(201)
        .json({ result: false, booking: null, message: "Fail" });
    }
    return res
      .status(200)
      .json({ result: true, booking: booking, message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Booking
 *   description: API for Booking operations
 */

/**
 * @swagger
 * /booking/api/add:
 *   post:
 *     tags: [Booking]
 *     summary: Add a booking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUser:
 *                 type: string
 *               idCar:
 *                 type: string
 *               timeFrom:
 *                 type: string
 *                 format: date-time
 *               timeTo:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *               location:
 *                 type: string
 *               totalDay:
 *                 type: number
 *               totalMoney:
 *                 type: number
 *               feeDelivery:
 *                 type: number
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *             booking:
 *               type: object
 *               properties:
 *                 // Add the properties of the booking object here
 *             message:
 *               type: string
 *       500:
 *         description: Server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */

/**
 * @swagger
 * /booking/api/accept:
 *   post:
 *     tags: [Booking]
 *     summary: Accept a booking
 *     parameters:
 *       - in: query
 *         name: id
 *         description: The ID of the booking
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
 *             booking:
 *               type: object
 *               properties:
 *                 // Add the properties of the booking object here
 *             message:
 *               type: string
 *       500:
 *         description: Server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */

/**
 * @swagger
 * /booking/api/delivering:
 *   post:
 *     tags: [Booking]
 *     summary: Process a booking
 *     parameters:
 *       - in: query
 *         name: id
 *         description: The ID of the booking
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
 *             booking:
 *               type: object
 *               properties:
 *                 // Add the properties of the booking object here
 *             message:
 *               type: string
 *       500:
 *         description: Server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */
/**
 * @swagger
 * /booking/api/add:
 *   post:
 *     tags: [Booking]
 *     summary: Add a booking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUser:
 *                 type: string
 *               idCar:
 *                 type: string
 *               timeFrom:
 *                 type: string
 *                 format: date-time
 *               timeTo:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *               location:
 *                 type: string
 *               totalDay:
 *                 type: number
 *               totalMoney:
 *                 type: number
 *               feeDelivery:
 *                 type: number
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *             booking:
 *               type: object
 *               properties:
 *                 // Add the properties of the booking object here
 *             message:
 *               type: string
 *       500:
 *         description: Server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */

/**
 * @swagger
 * /booking/api/delivering:
 *   post:
 *     tags: [Booking]
 *     summary: Process a booking
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *             booking:
 *               type: object
 *               properties:
 *                 // Add the properties of the booking object here
 *             message:
 *               type: string
 *       500:
 *         description: Server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */

/**
 * @swagger
 * /booking/api/receive:
 *   post:
 *     tags: [Booking]
 *     summary: Receive a booking
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *             booking:
 *               type: object
 *               properties:
 *                 // Add the properties of the booking object here
 *             message:
 *               type: string
 *       500:
 *         description: Server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */

/**
 * @swagger
 * /booking/api/return-car:
 *   post:
 *     summary: Return a car
 *     description: Endpoint to return a booked car.
 *     tags: [Booking]  
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: The booking ID.
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Fail
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 booking:
 *                   type: object
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /booking/api/complete:
 *   post:
 *     tags: [Booking]
 *     summary: Complete a booking
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *             booking:
 *               type: object
 *               properties:
 *                 // Add the properties of the booking object here
 *             message:
 *               type: string
 *       500:
 *         description: Server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */

/**
 * @swagger
 * /booking/api/reject:
 *   post:
 *     tags: [Booking]
 *     summary: Reject a booking
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *             booking:
 *               type: object
 *               properties:
 *                 // Add the properties of the booking object here
 *             message:
 *               type: string
 *       500:
 *         description: Server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */

/**
 * @swagger
 * /booking/api/get-by-id:
 *   get:
 *     tags: [Booking]
 *     summary: Get a booking by ID
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *             booking:
 *               type: object
 *               properties:
 *                 // Add the properties of the booking object here
 *             message:
 *               type: string
 *       500:
 *         description: Server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */

/**
 * @swagger
 * /booking/api/get-all:
 *   get:
 *     tags: [Booking]
 *     summary: Get all bookings
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               result:
 *                 type: boolean
 *               booking:
 *                 type: object
 *                 properties:
 *                   // Add the properties of the booking object here
 *               message:
 *                 type: string
 *       500:
 *         description: Server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */
/**
 * @swagger
 * /booking/api/get-by-owner-id:
 *   get:
 *     tags: [Booking]
 *     summary: Get bookings by owner ID
 *     parameters:
 *       - in: query
 *         name: idUser
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the owner
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
 *                 booking:
 *                   type: object
 *                 message:
 *                   type: string
 *       201:
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
 * /booking/api/get-history-by-id-user:
 *   get:
 *     tags: [Booking]
 *     summary: Get booking history by user ID
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
 *                 booking:
 *                   type: object
 *                 message:
 *                   type: string
 *       201:
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
 * /booking/api/cancel:
 *   post:
 *     tags: [Booking]
 *     summary: Cancel a booking
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the booking
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
 *                 booking:
 *                   type: object
 *                 message:
 *                   type: string
 *       201:
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
 * /booking/api/cancel-by-owner:
 *   post:
 *     tags: [Booking]
 *     summary: Cancel a booking by owner
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the booking
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
 *                 booking:
 *                   type: object
 *                 message:
 *                   type: string
 *       201:
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
 * /booking/api/get-list-pending:
 *   get:
 *     tags: [Booking]
 *     summary: Get list of pending bookings
 *     parameters:
 *       - in: query
 *         name: idOwner
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the owner
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *             booking:
 *               type: object
 *               properties:
 *                 // Add the properties of the booking object here
 *             message:
 *               type: string
 *       500:
 *         description: Server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */
/**
 * @swagger
 * /booking/api/get-list-accepted:
 *   get:
 *     tags: [Booking]
 *     summary: Get list of accepted bookings
 *     parameters:
 *       - in: query
 *         name: idOwner
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the owner
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *             booking:
 *               type: object
 *               properties:
 *                 // Add the properties of the booking object here
 *             message:
 *               type: string
 *       500:
 *         description: Server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */

/**
 * @swagger
 * /booking/api/get-list-during:
 *   get:
 *     summary: Get a list of bookings during a specific period.
 *     tags: [Booking]
 *     parameters:
 *       - in: query
 *         name: idOwner
 *         required: true
 *         description: The ID of the owner.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               result: true
 *               booking: [...]
 *               message: Success
 *       201:
 *         description: Unsuccessful response
 *         content:
 *           application/json:
 *             example:
 *               result: false
 *               booking: null
 *               message: Fail
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Server error
 */

/**
 * @swagger
 * /booking/api/get-list-complete:
 *   get:
 *     tags: [Booking]
 *     summary: Get list of complete bookings
 *     parameters:
 *       - in: query
 *         name: idOwner
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the owner
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *             booking:
 *               type: object
 *               properties:
 *                 // Add the properties of the booking object here
 *             message:
 *               type: string
 *       500:
 *         description: Server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */
/**
 * @swagger
 * /booking/api/get-list-cancel:
 *   get:
 *     tags: [Booking]
 *     summary: Get list of cancelled bookings
 *     parameters:
 *       - in: query
 *         name: idOwner
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the owner
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *             booking:
 *               type: object
 *               properties:
 *                 // Add the properties of the booking object here
 *             message:
 *               type: string
 *       500:
 *         description: Server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */
/**
 * @swagger
 * /booking/api/get-list-current-booking-of-user:
 *   get:
 *     tags: [Booking]
 *     summary: Get list of current bookings of a user
 *     parameters:
 *       - in: query
 *         name: idUser
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *             booking:
 *               type: object
 *               properties:
 *                 // Add the properties of the booking object here
 *             message:
 *               type: string
 *       500:
 *         description: Server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */

/**
 * @swagger
 * /booking/api/get-list-cancel-of-user:
 *   get:
 *     summary: Get list of canceled bookings for a user
 *     tags: [Booking]
 *     parameters:
 *       - in: query
 *         name: idUser
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             example:
 *               result: true
 *               booking: [BookingObject]
 *               message: Success
 *       '201':
 *         description: An unsuccessful response
 *         content:
 *           application/json:
 *             example:
 *               result: false
 *               booking: null
 *               message: Fail
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Server error
 */

/**
 * @swagger
 * /booking/api/get-list-complete-of-user:
 *   get:
 *     summary: Get list of completed bookings for a user
 *     tags: [Booking]
 *     parameters:
 *       - in: query
 *         name: idUser
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             example:
 *               result: true
 *               booking: [BookingObject]
 *               message: Success
 *       '201':
 *         description: An unsuccessful response
 *         content:
 *           application/json:
 *             example:
 *               result: false
 *               booking: null
 *               message: Fail
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Server error
 */

/**
 * @swagger
 * /booking/api/get-list-cancel-of-owner:
 *   get:
 *     summary: Get list of canceled bookings for an owner
 *     tags: [Booking]
 *     parameters:
 *       - in: query
 *         name: idOwner
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the owner
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             example:
 *               result: true
 *               booking: [BookingObject]
 *               message: Success
 *       '201':
 *         description: An unsuccessful response
 *         content:
 *           application/json:
 *             example:
 *               result: false
 *               booking: null
 *               message: Fail
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Server error
 */
