var express = require("express");
var router = express.Router();
const AddressController = require("../../components/Address/AddressController");

//http://localhost:3000/address/api/add-new-address
router.post("/add-new-address", async function (req, res, next) {
  try {
    const {
      idUser,
      city,
      district,
      ward,
      street,
      number,
      note,
      address,
      isDefault,
    } = req.body;
    console.log(req.body);
    const result = await AddressController.addNewAddress(
      idUser,
      city,
      district,
      ward,
      street,
      number,
      note,
      address,
      isDefault
    );

    if (result) {
      res.status(200).json({
        message: "Thêm địa chỉ thành công",
        data: result,
      });
    } else {
      res.status(400).json({
        message: "Thêm địa chỉ thất bại",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Thêm địa chỉ thất bại",
      data: error,
    });
  }
});

//http://localhost:3000/address/api/get-address-by-id-user
router.get("/get-address-by-id-user", async function (req, res, next) {
  try {
    const { idUser } = req.query;
    const result = await AddressController.getAddressByIdUser(idUser);
    if (result) {
      res.status(200).json({
        message: "Lấy địa chỉ thành công",
        data: result,
      });
    } else {
      res.status(201).json({
        message: "không có địa chỉ nào",
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Lấy địa chỉ thất bại",
      data: error,
    });
  }
});

//http://localhost:3000/address/api/get-address-by-id
router.get("/get-address-by-id", async function (req, res, next) {
  try {
    const { id } = req.query;
    const result = await AddressController.getAddressById(id);
    if (result) {
      res.status(200).json({
        message: "Lấy địa chỉ thành công",
        data: result,
      });
    } else {
      res.status(400).json({
        message: "Lấy địa chỉ thất bại",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Lấy địa chỉ thất bại",
      data: error,
    });
  }
});

//http://localhost:3000/address/api/update-address-by-id
router.put("/update-address-by-id", async function (req, res, next) {
  try {
    const {
      idUser,
      id,
      city,
      district,

      ward,
      street,
      number,

      note,
      address,
      isDefault
    } = req.body;
    console.log(req.body);
    const result = await AddressController.updateAddress(
      idUser,
      id,
      city,
      district,

      ward,
      street,
      number,

      note,
      address,
      isDefault

    );
    if (result) {
      res.status(200).json({
        message: "Cập nhật địa chỉ thành công",
        data: result,
      });
    } else {
      res.status(400).json({
        message: "Cập nhật địa chỉ thất bại",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Cập nhật địa chỉ thất bại",
      data: error,
    });
  }
});

//http://localhost:3000/address/api/delete-address-by-id
router.delete("/delete-address-by-id", async function (req, res, next) {
  try {
    const { id } = req.query;
    const result = await AddressController.deleteAddress(id);
    if (result) {
      res.status(200).json({
        message: "Xóa địa chỉ thành công",
        data: result,
      });
    } else {
      res.status(400).json({
        message: "Xóa địa chỉ thất bại",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Xóa địa chỉ thất bại",
      data: error,
    });
  }
});

//http://localhost:3000/address/api/set-default-address
router.put("/set-default-address", async function (req, res, next) {
  try {
    const { id, idUser } = req.body;
    const result = await AddressController.setDefaultAddress(id, idUser);
    if (result) {
      res.status(200).json({
        message: "Cập nhật địa chỉ mặc định thành công",
        data: result,
      });
    } else {
      res.status(400).json({
        message: "Cập nhật địa chỉ mặc định thất bại",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Cập nhật địa chỉ mặc định thất bại",
      data: error,
    });
  }
});

//http://localhost:3000/address/api/get-default-address
router.get("/get-default-address", async function (req, res, next) {
  try {
    const { idUser } = req.query;
    const result = await AddressController.getAddressDefaultByIdUser(idUser);
    if (result) {
      res.status(200).json({
        message: "Lấy địa chỉ mặc định thành công",
        data: result,
      });
    } else {
      res.status(400).json({
        message: "Lấy địa chỉ mặc định thất bại",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Lấy địa chỉ mặc định thất bại",
      data: error,
    });
  }
});

module.exports = router;

/**
 * @swagger
 * /address/api/add-new-address:
 *   post:
 *     tags: [Address]
 *     summary: Add new address
 *     description: Add a new address for a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUser:
 *                 type: string
 *               city:
 *                 type: string
 *               district:
 *                 type: string
 *               ward:
 *                 type: string
 *               street:
 *                 type: string
 *               number:
 *                 type: string
 *               note:
 *                 type: string
 *               address:
 *                 type: string
 *               isDefault:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 */
/**
 * @swagger
 * /address/api/get-address-by-id-user:
 *   get:
 *     tags: [Address]
 *     summary: Get addresses by user ID
 *     description: Get all addresses associated with a user by their ID
 *     parameters:
 *       - in: query
 *         name: idUser
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 */
/**
 * @swagger
 * /address/api/get-address-by-id:
 *   get:
 *     tags: [Address]
 *     summary: Get address by ID
 *     description: Get an address by its ID
 *     parameters:
 *       - in: query
 *         name: id
 *         description: ID of the address
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 */
/**
 * @swagger
 * /address/api/update-address-by-id:
 *   put:
 *     tags:
 *       - Address
 *     description: Update an address by ID
 *     parameters:
 *       - in: query
 *         name: id
 *         description: ID of the address
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: address
 *         description: Address object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             city:
 *               type: string
 *             district:
 *               type: string
 *             ward:
 *               type: string
 *             street:
 *               type: string
 *             number:
 *               type: string
 *             note:
 *               type: string
 *             isDefault:
 *               type: boolean
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 */

/**
 * @swagger
 * /address/api/delete-address-by-id:
 *   delete:
 *     tags:
 *       - Address
 *     description: Delete an address by ID
 *     parameters:
 *       - in: query
 *         name: id
 *         description: ID of the address
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 */
/**
 * @swagger
 * /address/api/set-default-address:
 *   put:
 *     tags:
 *       - Address
 *     description: Set an address as default by ID
 *     parameters:
 *       - in: query
 *         name: id
 *         description: ID of the address
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: idUser
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 */
/**
 * @swagger
 * /address/api/get-default-address:
 *   get:
 *     tags:
 *       - Address
 *     description: Get the default address for a user
 *     parameters:
 *       - in: query
 *         name: idUser
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 */
/**
 * @swagger
 * /address/api/update-address-by-id:
 *   put:
 *     summary: Update an address by ID
 *     description: Update an existing address with the provided data
 *     tags:
 *       - Address
 *     parameters:
 *       - in: body
 *         name: address
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             idUser:
 *               type: integer
 *             id:
 *               type: integer
 *             city:
 *               type: string
 *             district:
 *               type: string
 *             ward:
 *               type: string
 *             street:
 *               type: string
 *             number:
 *               type: string
 *             note:
 *               type: string
 *             address:
 *               type: string
 *             isDefault:
 *               type: boolean
 *     responses:
 *       200:
 *         description: Successfully updated the address
 *         content:
 *           application/json:
 *             example:
 *               message: Cập nhật địa chỉ thành công
 *               data: {}
 *       400:
 *         description: Failed to update the address
 *         content:
 *           application/json:
 *             example:
 *               message: Cập nhật địa chỉ thất bại
 *               data: {}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: Cập nhật địa chỉ thất bại
 *               data: {}
 */