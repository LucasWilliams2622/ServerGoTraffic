var express = require("express");
var router = express.Router();
const carController = require("../../components/Car/CarController");
const upLoadImage = require("../../MiddleWare/UpLoadImage");

//http://localhost:3000/car/api/add
router.post("/add", async (req, res, next) => {
  try {
    const {
      idUser,
      carBrand,
      numberPlate,
      name,
      yearOfManufacture,
      seats,
      gear,
      fuel,

      locationCar,
      latitude,
      longitude,
      description,
      fuelConsumption,
      isDelivery,
      deliveryWithin,
      deliveryFee,
      freeDeliveryWithin,

      limitKmStatus,
      maxKm,
      exceededFee,

      price,
      utilities,
      image,
      imageThumbnail,
      withDriver,
    } = req.body;
    console.log("numberPlate", numberPlate);

    const car = await carController.add(
      idUser,
      carBrand,
      numberPlate,
      name,
      yearOfManufacture,
      seats,
      gear,
      fuel,

      locationCar,
      latitude,
      longitude,
      description,
      fuelConsumption,
      isDelivery,
      deliveryWithin,
      deliveryFee,
      freeDeliveryWithin,

      limitKmStatus,
      maxKm,
      exceededFee,

      price,
      utilities,
      image,
      imageThumbnail,
      withDriver
    );
    console.log("====>", car);
    if (car) {
      return res.status(200).json({ result: true, message: "Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, car: null, message: " Failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, message: "Error System" });
  }
});

//http://localhost:3000/car/api/check-car-exist?numberPlate=123
router.get("/check-car-exist", async (req, res, next) => {
  try {
    const { numberPlate } = req.query;
    const car = await carController.checkCarExist(numberPlate);
    if (car) {
      return res
        .status(200)
        .json({ result: true, message: "CAR Already Exist" });
    }
    return res.status(201).json({ result: false, message: "IS A NEW CAR" });
  } catch (error) {
    console.log(error);
  }
});
//http://localhost:3000/car/api/list-by-id-user?idUser=1
router.get("/list-by-id-user", async (req, res, next) => {
  try {
    const { idUser } = req.query;
    const listCar = await carController.getListCarByIdUser(idUser);
    if (listCar) {
      return res
        .status(200)
        .json({ result: true, listCar: listCar, message: "Success" });
    } else {
      return res
        .status(201)
        .json({ result: false, listCar: null, message: "Failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, message: "Error System" });
  }
});

//http://localhost:3000/car/api/list-by-car-brand?carBrand=1
router.get("/list-by-car-brand", async (req, res, next) => {
  try {
    const { carBrand } = req.query;
    const listCar = await carController.getListCarByCarBrand(carBrand);
    if (listCar) {
      return res
        .status(200)
        .json({ result: true, listCar: listCar, message: "Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, listCar: null, message: "Failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, message: "Error System" });
  }
});

//http://localhost:3000/car/api/delete?idCar=1
router.delete("/delete", async (req, res, next) => {
  try {
    const { idCar } = req.query;
    const car = await carController.deleteCar(idCar);
    if (car) {
      return res
        .status(200)
        .json({ result: true, car: car, message: "Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, car: null, message: "Failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, message: "Error System" });
  }
});

//http://localhost:3000/car/api/update-info-car?idCar=1
router.put("/update-info-car", async (req, res, next) => {
  try {
    const { idCar } = req.query;
    const {
      numberPlate,
      locationCar,
      latitude,
      longitude,
      description,
      fuelConsumption,
      utilities,
    } = req.body;

    const car = await carController.updateCar(
      idCar,
      numberPlate,
      locationCar,
      latitude,
      longitude,
      description,
      fuelConsumption,
      utilities
    );

    if (car) {
      return res
        .status(200)
        .json({ result: true, car: car, message: "Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, car: null, message: "Failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, message: "Error System" });
  }
});

//http://localhost:3000/car/api/update-surcharge-car?idCar=1
router.put("/update-surcharge-car", async (req, res, next) => {
  try {
    const { idCar } = req.query;
    const {
      limitKmStatus,
      maxKm,
      exceededFee,

      overtimeStatus,
      overtimeCharge,
      overtimeDay,

      carCleanStatus,
      carCleanFee,

      carDeodorizerStatus,
      carDeodorizerFee,
    } = req.body;

    const car = await carController.updateSurchargeCar(
      idCar,
      limitKmStatus,
      maxKm,
      exceededFee,

      overtimeStatus,
      overtimeCharge,
      overtimeDay,

      carCleanStatus,
      carCleanFee,

      carDeodorizerStatus,
      carDeodorizerFee
    );

    if (car) {
      return res
        .status(200)
        .json({ result: true, car: car, message: "Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, car: null, message: "Failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, message: "Error System" });
  }
});

//http://localhost:3000/car/api/update-delivered-on-site?idCar=1
router.put("/update-delivered-on-site", async (req, res, next) => {
  try {
    const { idCar } = req.query;
    const { isDelivery, deliveryWithin, deliveryFee, freeDeliveryWithin } =
      req.body;
    console.log("isDelivery", req.body);
    const car = await carController.updateDeliveredOnSite(
      idCar,
      isDelivery,
      deliveryWithin,
      deliveryFee,
      freeDeliveryWithin
    );
    if (car) {
      return res
        .status(200)
        .json({ result: true, car: car, message: "Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, car: null, message: "Failed" });
    }
  } catch (error) {
    console.log(error);
  }
});

//http://localhost:3000/car/api/list
router.get("/list", async (req, res, next) => {
  try {
    const idUser = req.query.idUser;
    const listCar = await carController.listCar(idUser);
    if (listCar) {
      return res
        .status(200)
        .json({ result: true, listCar: listCar, message: "Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, listCar: null, message: "Failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, message: "Error System" });
  }
});

//http://localhost:3000/car/api/get-by-id-car?idCar=1
router.get("/get-by-id-car", async (req, res, next) => {
  try {
    const { idCar } = req.query;
    const car = await carController.getById(idCar);
    if (car) {
      return res
        .status(200)
        .json({ result: true, car: car, message: "Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, car: null, message: "Failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, message: "Error System" });
  }
});

//http://localhost:3000/car/api/browse?idCar=1
router.put("/browse", async (req, res, next) => {
  try {
    const { idCar } = req.query;
    const car = await carController.browse(idCar);
    if (car) {
      return res
        .status(200)
        .json({ result: true, car: car, message: "Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, car: null, message: "Failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, message: "Error System" });
  }
});

//http://localhost:3000/car/api/upload-car-images
router.post(
  "/upload-car-images",
  upLoadImage.array("images", 10), // "images" là tên trường trong form để tải lên nhiều hình ảnh, 10 là số lượng tối đa của hình ảnh
  async (req, res, next) => {
    try {
      const files = req.files;
      console.log("files", files);
      if (files && files.length >= 4 && files.length <= 10) {
        const links = files.map(
          (file) => `http://103.57.129.166:3000/images/${file.filename}`
        );
        console.log("links", links);
        return res.status(200).json({ result: true, links: links });
      }
      return res.status(400).json({ result: false, links: [] });
    } catch (error) {
      console.log("Failed to upload error: " + error);
      return res
        .status(500)
        .json({ result: false, message: "Failed to upload images" });
    }
  }
);

//http://localhost:3000/car/api/upload-single-image
router.post(
  "/upload-single-image",
  [upLoadImage.single("image")],
  async (req, res, next) => {
    try {
      const { file } = req;
      console.log("file", file);
      if (file) {
        const link = `http://103.57.129.166:3000/images/${file.filename}`;
        return res.status(200).json({ result: true, link: link });
      }
      return res.status(400).json({ result: false, link: null });
    } catch (error) {
      console.log("Failed to updaload error:" + error);
      return res
        .status(500)
        .json({ result: false, massage: "Failed to updaload avatar" });
    }
  }
);

//http://localhost:3000/car/api/search-by-city-district-ward
router.get("/search-by-city-district-ward", async (req, res, next) => {
  try {
    const { city, district, ward } = req.body;
    const listCar = await carController.searchByCity(city, district, ward);
    if (listCar) {
      return res
        .status(200)
        .json({ result: true, listCar: listCar, message: "Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, listCar: null, message: "Failed" });
    }
  } catch (error) {
    console.log("Failed to upload error: " + error);
    return res.status(500).json({ result: false, message: "Error System" });
  }
});

//http://localhost:3000/car/api/update-image-car?idCar=1&i
router.put("/update-image-car", async (req, res, next) => {
  try {
    const { idCar } = req.query;
    let {
      image,
      imageThumbnail,
      imageRegister,
      imageRegistry,
      imageInsurance,
    } = req.body;
    // console.log("abc",JSON.stringify(image));
    // image = JSON.stringify(image);
    const car = await carController.updateImageCar(
      idCar,
      image,
      imageThumbnail,
      imageRegister,
      imageRegistry,
      imageInsurance
    );
    if (car) {
      return res
        .status(200)
        .json({ result: true, car: car, message: "Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, car: null, message: "Failed" });
    }
  } catch (error) {
    console.log("Failed to upload error: " + error);
    return res.status(500).json({ result: false, message: "Error System" });
  }
});

//http://localhost:3000/car/api/update-price-car?idCar=1
router.put("/update-price-car", async (req, res, next) => {
  try {
    const { idCar } = req.query;
    const { price } = req.body;
    const car = await carController.updatePriceCar(idCar, price);
    if (car) {
      return res
        .status(200)
        .json({ result: true, car: car, message: "Update Price Car Success" });
    }
    return res
      .status(400)
      .json({ result: false, car: null, message: "Failed" });
  } catch (error) {
    console.log(error);
  }
});

//http://localhost:3000/car/api/get-car-by-city?city=Hà Nội
router.get("/get-car-by-city", async (req, res, next) => {
  try {
    const { city } = req.query;
    console.log("city", city);
    const listCar = await carController.getCarByCity(city);
    if (listCar) {
      return res
        .status(200)
        .json({ result: true, listCar: listCar, message: "Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, listCar: null, message: "Failed" });
    }
  } catch (error) {
    console.log("Failed to upload error: " + error);
    return res.status(500).json({ result: false, message: "Error System" });
  }
});

//http://localhost:3000/car/api/sort-car
router.get("/sort-car", async (req, res, next) => {
  try {
    const {
      carBrand,
      yearOfManufacture,
      seats,
      gear,
      fuel,

      isDelivery,
      withDriver,

      rating,
      ratingStatus,
      minPrice,
      maxPrice,
    } = req.body;
    console.log("body ", req.body);
    const sortedCars = await carController.getSortedCars(
      carBrand,
      yearOfManufacture,
      seats,
      gear,
      fuel,

      isDelivery,
      withDriver,

      rating,
      ratingStatus,
      minPrice,
      maxPrice
    );

    if (sortedCars) {
      return res
        .status(200)
        .json({ result: true, listCar: sortedCars, message: "Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, listCar: null, message: "Failed" });
    }
  } catch (error) {
    console.log("Failed to upload error: " + error);
    return res.status(500).json({ result: false, message: "Error System" });
  }
});

//http://localhost:3000/car/api/sort-by-location-and-time
router.post("/sort-by-location-and-time", async (req, res, next) => {
  try {
    const { type, location, timeStart, timeEnd } = req.body;
    // type = withDriver or not
    const sortedCars = await carController.getSortedCarsByLocationAndTime(
      type,
      location,
      timeStart,
      timeEnd
    );
    if (sortedCars) {
      return res
        .status(200)
        .json({ result: true, listCar: sortedCars, message: "Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, listCar: null, message: "Failed" });
    }
  } catch (error) {
    console.log("Failed to upload error: " + error);
    return res.status(500).json({ result: false, message: "Error System" });
  }
});

//http://localhost:3000/car/api/get-not-browser-car
router.get("/get-not-browser-car", async (req, res, next) => {
  try {
    const car = await carController.getNotBrowseCar();
    if (car) {
      return res
        .status(200)
        .json({ result: true, car: car, message: "Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, car: null, message: "Failed" });
    }
  } catch (error) {
    console.log(error);
  }
});

//http://localhost:3000/car/api/refuse-car
router.put("/refuse-car", async (req, res, next) => {
  try {
    const { idCar } = req.query;
    const car = await carController.refuseCar(idCar);
    if (car) {
      return res
        .status(200)
        .json({ result: true, car: car, message: "Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, car: null, message: "Failed" });
    }
  } catch (error) {
    console.log(error);
  }
});

//http://localhost:3000/car/api/get-car-with-driver
router.get("/get-car-with-driver", async (req, res, next) => {
  try {
    const car = await carController.getCarHasDriver();
    if (car) {
      return res
        .status(200)
        .json({ result: true, car: car, message: "Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, car: null, message: "Failed" });
    }
  } catch (error) {
    console.log(error);
  }
});

//http://localhost:3000/car/api/get-the-most-booked-car
router.get("/get-the-most-booked-car", async (req, res, next) => {
  try {
    const { isMostBooked } = req.query;
    const car = await carController.getTheMostBookedCar(isMostBooked);
    if (car) {
      return res
        .status(200)
        .json({ result: true, car: car, message: "Success" });
    }
    return res
      .status(400)
      .json({ result: false, car: null, message: "Failed" });
  } catch (error) {
    console.log(error);
  }
});

//http://localhost:3000/car/api/get-all-location-car-by-user
router.get("/get-all-location-car-by-user", async (req, res, next) => {
  try {
    const { idUser } = req.query;
    const location = await carController.getAllLocation(idUser);
    if (location) {
      return res
        .status(200)
        .json({ result: true, location: location, message: "Success" });
    }
    return res
      .status(400)
      .json({ result: false, location: null, message: "Failed" });
  } catch (error) {
    console.log(error);
  }
});

//http://localhost:3000/car/api/get-car-by-status-of-user?idUser=1
router.get("/get-car-by-status-of-user", async (req, res, next) => {
  try {
    const { idUser, status } = req.query;
    // 1 doi duyet, 2 da duyet ,3 tu choi duyet
    const car = await carController.getCarByStatusOfUser(idUser, status);
    if (car) {
      return res
        .status(200)
        .json({ result: true, car: car, message: "Success" });
    }
    return res
      .status(400)
      .json({ result: false, car: null, message: "Failed" });
  } catch (error) {
    console.log(error);
  }
});

//http://localhost:3000/car/api/get-most-booked-car-by-user?idUser=1&isMostBooked=1
router.get("/get-most-booked-car-by-user", async (req, res, next) => {
  try {
    const { idUser, isMostBooked } = req.query;
    const car = await carController.getMostBookedCarByUser(
      idUser,
      isMostBooked
    );
    if (car) {
      return res
        .status(200)
        .json({ result: true, car: car, message: "Success" });
    }
    return res
      .status(400)
      .json({ result: false, car: null, message: "Failed" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Car
 *   description: API for Car operations
 */
/**
 * @swagger
 * tags:
 *   name: Cars
 *   description: API for managing cars
 *
 * /car/api/add:
 *   post:
 *     summary: Add a new car
 *     tags: [Car]
 *     requestBody:
 *       description: Car data to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUser:
 *                 type: string
 *                 description: ID of the user adding the car
 *               carBrand:
 *                 type: string
 *                 description: Brand of the car
 *               numberPlate:
 *                 type: string
 *                 description: Number plate of the car
 *               name:
 *                 type: string
 *                 description: Name of the car
 *               yearOfManufacture:
 *                 type: integer
 *                 description: Year of manufacture of the car
 *               seats:
 *                 type: integer
 *                 description: Number of seats in the car
 *               gear:
 *                 type: string
 *                 description: Type of gear (e.g., automatic, manual)
 *               fuel:
 *                 type: string
 *                 description: Type of fuel the car uses
 *               locationCar:
 *                 type: string
 *                 description: Location of the car
 *               latitude:
 *                 type: number
 *                 description: Latitude of the car location
 *               longitude:
 *                 type: number
 *                 description: Longitude of the car location
 *               description:
 *                 type: string
 *                 description: Description of the car
 *               fuelConsumption:
 *                 type: number
 *                 description: Fuel consumption of the car
 *               isDelivery:
 *                 type: boolean
 *                 description: Indicates if the car offers delivery
 *               deliveryWithin:
 *                 type: string
 *                 description: Area where delivery is available
 *               deliveryFee:
 *                 type: number
 *                 description: Delivery fee
 *               freeDeliveryWithin:
 *                 type: string
 *                 description: Area where free delivery is available
 *               limitKmStatus:
 *                 type: boolean
 *                 description: Indicates if there is a limit on kilometers
 *               maxKm:
 *                 type: number
 *                 description: Maximum kilometers allowed
 *               exceededFee:
 *                 type: number
 *                 description: Fee for exceeding the maximum kilometers
 *               price:
 *                 type: number
 *                 description: Price of the car rental
 *               utilities:
 *                 type: string
 *                 description: Utilities provided with the car
 *               image:
 *                 type: string
 *                 description: URL of the main image of the car
 *               imageThumbnail:
 *                 type: string
 *                 description: URL of the thumbnail image of the car
 *     responses:
 *       '200':
 *         description: Successfully added a new car
 *         content:
 *           application/json:
 *             example:
 *               result: true
 *               car:
 *                 id: 123
 *                 name: "Car Name"
 *               message: "Success"
 *       '400':
 *         description: Failed to add a new car
 *         content:
 *           application/json:
 *             example:
 *               result: false
 *               car: null
 *               message: "Failed"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               result: false
 *               message: "Error System"
 */
/**
 * @swagger
 * /car/api/list:
 *   get:
 *     summary: Get a list of cars
 *     tags: [Car]
 *     parameters:
 *       - in: query
 *         name: idUser
 *         schema:
 *           type: integer
 *         description: ID of the user to exclude from the list
 *     responses:
 *       '200':
 *         description: A list of cars
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   description: Result status
 *                 listCar:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Car'
 *                   description: List of cars
 *                 message:
 *                   type: string
 *                   description: Response message
 *       '400':
 *         description: Failed to get the list of cars
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   description: Result status
 *                 listCar:
 *                   type: null
 *                   description: Null when failed
 *                 message:
 *                   type: string
 *                   description: Error message
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   description: Result status
 *                 message:
 *                   type: string
 *                   description: Error message
 */
/**
 * @swagger
 * /car/api/get-by-id-car:
 *   get:
 *     tags: [Car]
 *     summary: Get car by ID
 *     description: Retrieve a car by its ID
 *     parameters:
 *       - in: query
 *         name: idCar
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the car
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *               description: Indicates if the request was successful
 *             car:
 *               type: object
 *               description: The car object
 *             message:
 *               type: string
 *               description: Success message
 *       400:
 *         description: Failed
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *               description: Indicates if the request was successful
 *             car:
 *               type: null
 *               description: Null value
 *             message:
 *               type: string
 *               description: Error message
 *       500:
 *         description: Error System
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *               description: Indicates if the request was successful
 *             message:
 *               type: string
 *               description: Error message
 */
/**
 * @swagger
 * /car/api/list-by-id-user:
 *   get:
 *     tags: [Car]
 *     summary: Get list of cars by user ID
 *     description: Retrieve a list of cars by user ID
 *     parameters:
 *       - in: query
 *         name: idUser
 *         schema:
 *           type: integer
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
 *               description: Indicates if the request was successful
 *             listCar:
 *               type: array
 *               items:
 *                 type: object
 *               description: The list of cars
 *             message:
 *               type: string
 *               description: Success message
 *       400:
 *         description: Failed
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *               description: Indicates if the request was successful
 *             listCar:
 *               type: null
 *               description: Null value
 *             message:
 *               type: string
 *               description: Error message
 *       500:
 *         description: Error System
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *               description: Indicates if the request was successful
 *             message:
 *               type: string
 *               description: Error message
 */
/**
 * @swagger
 * /car/api/list-by-id-user:
 *   get:
 *     tags: [Car]
 *     summary: Get list of cars by user ID
 *     description: Retrieve a list of cars by user ID
 *     parameters:
 *       - in: query
 *         name: idUser
 *         schema:
 *           type: integer
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
 *               description: Indicates if the request was successful
 *             listCar:
 *               type: array
 *               items:
 *                 type: object
 *               description: The list of cars
 *             message:
 *               type: string
 *               description: Success message
 *       400:
 *         description: Failed
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *               description: Indicates if the request was successful
 *             listCar:
 *               type: null
 *               description: Null value
 *             message:
 *               type: string
 *               description: Error message
 *       500:
 *         description: Error System
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *               description: Indicates if the request was successful
 *             message:
 *               type: string
 *               description: Error message
 */
/**
 * @swagger
 * /car/api/delete:
 *   delete:
 *     tags: [Car]
 *     summary: Delete a car by ID
 *     parameters:
 *       - in: query
 *         name: idCar
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the car to delete
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
 *                   description: Indicates if the request was successful
 *                 car:
 *                   type: object
 *                   description: The deleted car object
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                 car:
 *                   type: null
 *                   description: Null value
 *                 message:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Error System
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                 message:
 *                   type: string
 *                   description: Error message
 */
/**
 * @swagger
 * /car/api/update-info-car:
 *   put:
 *     tags: [Car]
 *     summary: Update car information
 *     parameters:
 *       - in: query
 *         name: idCar
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the car to update
 *       - in: body
 *         name: car
 *         schema:
 *           type: object
 *           properties:
 *             numberPlate:
 *               type: string
 *             locationCar:
 *               type: string
 *             latitude:
 *               type: number
 *             longitude:
 *               type: number
 *             description:
 *               type: string
 *             fuelConsumption:
 *               type: number
 *             isDelivery:
 *               type: boolean
 *             limitKmStatus:
 *               type: number
 *             utilities:
 *               type: array
 *               items:
 *                 type: string
 *             updatedAt:
 *               type: string
 *               format: date-time
 *         required: true
 *         description: Updated car information
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
 *                   description: Indicates if the request was successful
 *                 car:
 *                   type: object
 *                   description: The updated car object
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                 car:
 *                   type: null
 *                   description: Null value
 *                 message:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Error System
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                 message:
 *                   type: string
 *                   description: Error message
 */
/**
 * @swagger
 * /car/api/list-by-car-brand:
 *   get:
 *     tags: [Car]
 *     summary: Get a list of cars by car brand ID
 *     parameters:
 *       - in: query
 *         name: carBrand
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the car brand
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
 *                   description: Indicates if the request was successful
 *                 listCar:
 *                   type: array
 *                   items:
 *                     type: object
 *                   description: The list of cars
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                 listCar:
 *                   type: null
 *                   description: Null value
 *                 message:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Error System
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                 message:
 *                   type: string
 *                   description: Error message
 */
/**
 * @swagger
 * /car/api/add:
 *   post:
 *     summary: Add a new car
 *     tags: [Car]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUser:
 *                 type: string
 *                 description: ID of the user
 *               carBrand:
 *                 type: string
 *                 description: ID of the car brand
 *               numberPlate:
 *                 type: string
 *                 description: Number plate of the car
 *               name:
 *                 type: string
 *                 description: Name of the car
 *               yearOfManufacture:
 *                 type: integer
 *                 description: Year of manufacture of the car
 *               seats:
 *                 type: integer
 *                 description: Number of seats in the car
 *               gear:
 *                 type: string
 *                 description: Type of gear (manual/automatic)
 *               fuel:
 *                 type: string
 *                 description: Type of fuel (petrol/diesel)
 *               locationCar:
 *                 type: string
 *                 description: Location of the car
 *               latitude:
 *                 type: number
 *                 description: Latitude coordinate of the car's location
 *               longitude:
 *                 type: number
 *                 description: Longitude coordinate of the car's location
 *               description:
 *                 type: string
 *                 description: Description of the car
 *               fuelConsumption:
 *                 type: number
 *                 description: Fuel consumption of the car
 *               isDelivery:
 *                 type: boolean
 *                 description: Indicates if delivery service is available for the car
 *               limitKmStatus:
 *                 type: number
 *                 description: Limit of kilometers allowed for the car
 *               price:
 *                 type: number
 *                 description: Price per day for renting the car
 *               utilities:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of utilities available in the car
 *               image:
 *                 type: string
 *                 description: Image URL of the car
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
 *                   description: Indicates if the request was successful
 *                 car:
 *                   type: object
 *                   description: The added car object
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                 car:
 *                   type: null
 *                   description: Null value
 *                 message:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Error System
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                 message:
 *                   type: string
 *                   description: Error message
 */
/**
 * @swagger
 * /car/api/update-image-car:
 *   put:
 *     summary: Update the images of a car
 *     tags: [Car]
 *     parameters:
 *       - in: query
 *         name: idCar
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the car
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 description: Image URL of the car
 *               imageRegister:
 *                 type: string
 *                 description: Image URL of the car registration document
 *               imageRegistry:
 *                 type: string
 *                 description: Image URL of the car registry document
 *               imageInsurance:
 *                 type: string
 *                 description: Image URL of the car insurance document
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
 *                   description: Indicates if the request was successful
 *                 car:
 *                   type: object
 *                   description: The updated car object
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                 car:
 *                   type: null
 *                   description: Null value
 *                 message:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Error System
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                 message:
 *                   type: string
 *                   description: Error message
 */
/**
 * @swagger
 * /car/api/upload-car-images:
 *   post:
 *     tags: [Car]
 *     summary: Upload multiple car images
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: images
 *         type: file
 *         description: The car images to upload (multiple files allowed)
 *         required: true
 *     responses:
 *       200:
 *         description: Successful upload
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *               description: Indicates if the upload was successful
 *             links:
 *               type: array
 *               items:
 *                 type: string
 *               description: The links to the uploaded images
 *       400:
 *         description: Invalid request or insufficient number of images
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *               description: Indicates if the upload was successful
 *             links:
 *               type: array
 *               items:
 *                 type: string
 *               description: The links to the uploaded images
 *       500:
 *         description: Failed to upload images
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *               description: Indicates if the upload was successful
 *             message:
 *               type: string
 *               description: Error message
 */

/**
 * @swagger
 * /car/api/upload-single-image:
 *   post:
 *     tags: [Car]
 *     summary: Upload a single car image
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: image
 *         type: file
 *         description: The car image to upload
 *         required: true
 *     responses:
 *       200:
 *         description: Successful upload
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *               description: Indicates if the upload was successful
 *             link:
 *               type: string
 *               description: The link to the uploaded image
 *       400:
 *         description: Invalid request or missing image
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *               description: Indicates if the upload was successful
 *             link:
 *               type: string
 *               description: The link to the uploaded image
 *       500:
 *         description: Failed to upload image
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *               description: Indicates if the upload was successful
 *             message:
 *               type: string
 *               description: Error message
 */
/**
 * @swagger
 * /car/api/search-by-city-district-ward:
 *   get:
 *     tags: [Car]
 *     summary: Search cars by city, district, and ward
 *     parameters:
 *       - in: query
 *         name: city
 *         type: string
 *         description: The city to search for cars in
 *         required: true
 *       - in: query
 *         name: district
 *         type: string
 *         description: The district to search for cars in
 *         required: true
 *       - in: query
 *         name: ward
 *         type: string
 *         description: The ward to search for cars in
 *         required: true
 *     responses:
 *       200:
 *         description: Successful search
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *               description: Indicates if the search was successful
 *             listCar:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Car'
 *               description: The list of cars matching the search criteria
 *             message:
 *               type: string
 *               description: Success message
 *       400:
 *         description: Invalid request or no cars found
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *               description: Indicates if the search was successful
 *             listCar:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Car'
 *               description: The list of cars matching the search criteria
 *             message:
 *               type: string
 *               description: Error message
 *       500:
 *         description: Failed to search cars
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *               description: Indicates if the search was successful
 *             message:
 *               type: string
 *               description: Error message
 *
 * definitions:
 *   Car:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: The ID of the car
 *       make:
 *         type: string
 *         description: The make of the car
 *       model:
 *         type: string
 *         description: The model of the car
 *       year:
 *         type: integer
 *         description: The year of the car
 *       price:
 *         type: number
 *         description: The price of the car
 *       mileage:
 *         type: number
 *         description: The mileage of the car
 *       city:
 *         type: string
 *         description: The city of the car
 *       district:
 *         type: string
 *         description: The district of the car
 *       ward:
 *         type: string
 *         description: The ward of the car
 */
/**
 * @swagger
 * /car/api/get-car-by-city:
 *   get:
 *     tags: [Car]
 *     summary: Get cars by city
 *     description: Retrieve a list of cars based on the specified city.
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         required: true
 *         description: The city to filter the cars by.
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 listCar:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Car'
 *                 message:
 *                   type: string
 *       '400':
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 listCar:
 *                   type: null
 *                 message:
 *                   type: string
 *       '500':
 *         description: Internal server error
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
 * /car/api/get-not-browser-car:
 *   get:
 *     tags: [Car]
 *     summary: Get Not Browser Car
 *     description: Retrieve information about cars that have not been browsed.
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
 *                 car:
 *                   type: object
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
 *                 car:
 *                   type: null
 *                 message:
 *                   type: string
 *       500:
 *         description: Error
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
/*
 * @swagger
 * /car/api/refuse-car:
 *   put:
 *     tags: [Car]
 *     summary: Refuse Car
 *     description: Refuse a specific car.
 *     parameters:
 *       - in: query
 *         name: idCar
 *         description: ID of the car
 *         required: true
 *         schema:
 *           type: integer
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
 *                 car:
 *                   type: object
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
 *                 car:
 *                   type: null
 *                 message:
 *                   type: string
 *       500:
 *         description: Error
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
 * tags:
 *   name: Car
 *   description: API for managing cars
 *
 * components:
 *   parameters:
 *     carIdQueryParam:
 *       name: idCar
 *       in: query
 *       description: ID of the car
 *       required: true
 *       schema:
 *         type: integer
 *
 * /car/api/update-surcharge-car:
 *   put:
 *     summary: Update surcharge information for a car
 *     tags: [Car]
 *     parameters:
 *       - $ref: '#/components/parameters/carIdQueryParam'
 *     requestBody:
 *       description: Surcharge information to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               limitKmStatus:
 *                 type: boolean
 *                 description: Indicates if there is a limit on kilometers
 *               maxKm:
 *                 type: number
 *                 description: Maximum kilometers allowed
 *               exceededFee:
 *                 type: number
 *                 description: Fee for exceeding the maximum kilometers
 *               overtimeStatus:
 *                 type: boolean
 *                 description: Indicates if there is an overtime charge
 *               overtimeCharge:
 *                 type: number
 *                 description: Overtime charge
 *               overtimeDay:
 *                 type: number
 *                 description: Overtime days allowed
 *               carCleanStatus:
 *                 type: boolean
 *                 description: Indicates if there is a car cleaning charge
 *               carCleanFee:
 *                 type: number
 *                 description: Car cleaning fee
 *               carDeodorizerStatus:
 *                 type: boolean
 *                 description: Indicates if there is a car deodorizer charge
 *               carDeodorizerFee:
 *                 type: number
 *                 description: Car deodorizer fee
 *     responses:
 *       '200':
 *         description: Successfully updated surcharge information for the car
 *         content:
 *           application/json:
 *             example:
 *               result: true
 *               car:
 *                 id: 123
 *                 name: "Car Name"
 *               message: "Success"
 *       '400':
 *         description: Failed to update surcharge information for the car
 *         content:
 *           application/json:
 *             example:
 *               result: false
 *               car: null
 *               message: "Failed"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               result: false
 *               message: "Error System"
 *
 * /car/api/update-delivered-on-site:
 *   put:
 *     summary: Update delivery information for a car
 *     tags: [Car]
 *     parameters:
 *       - $ref: '#/components/parameters/carIdQueryParam'
 *     requestBody:
 *       description: Delivery information to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isDelivery:
 *                 type: boolean
 *                 description: Indicates if the car offers delivery
 *               deliveryWithin:
 *                 type: string
 *                 description: Area where delivery is available
 *               deliveryFee:
 *                 type: number
 *                 description: Delivery fee
 *               freeDeliveryWithin:
 *                 type: string
 *                 description: Area where free delivery is available
 *     responses:
 *       '200':
 *         description: Successfully updated delivery information for the car
 *         content:
 *           application/json:
 *             example:
 *               result: true
 *               car:
 *                 id: 123
 *                 name: "Car Name"
 *               message: "Success"
 *       '400':
 *         description: Failed to update delivery information for the car
 *         content:
 *           application/json:
 *             example:
 *               result: false
 *               car: null
 *               message: "Failed"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               result: false
 *               message: "Error System"
 */
/**
 * @swagger
 * tags:
 *   name: Car
 *   description: Car related operations
 */

/**
 * @swagger
 * /car/api/get-car-with-driver:
 *   get:
 *     summary: Get car with driver
 *     tags: [Car]
 *     description: Retrieve information about a car that has a driver.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               result: true
 *               car:
 *                 // Include sample car response here
 *               message: Success
 *       400:
 *         description: Failed response
 *         content:
 *           application/json:
 *             example:
 *               result: false
 *               car: null
 *               message: Failed
 *     security:
 *       - apiKey: []
 */
/**
 * @swagger
 * /car/api/sort-car:
 *   get:
 *     summary: Sort cars
 *     tags: [Car]
 *     description: Retrieve a list of cars based on specified sorting parameters.
 *     parameters:
 *       - name: carBrand
 *         in: query
 *         description: Brand of the car
 *         schema:
 *           type: string
 *       - name: yearOfManufacture
 *         in: query
 *         description: Year of manufacture of the car
 *         schema:
 *           type: integer
 *       - name: seats
 *         in: query
 *         description: Number of seats in the car
 *         schema:
 *           type: integer
 *       - name: gear
 *         in: query
 *         description: Type of gear (automatic/manual)
 *         schema:
 *           type: string
 *       - name: fuel
 *         in: query
 *         description: Type of fuel the car uses
 *         schema:
 *           type: string
 *       - name: isDelivery
 *         in: query
 *         description: Indicates if the car is available for delivery
 *         schema:
 *           type: boolean
 *       - name: withDriver
 *         in: query
 *         description: Indicates if the car comes with a driver
 *         schema:
 *           type: boolean
 *       - name: rating
 *         in: query
 *         description: Rating of the car
 *         schema:
 *           type: number
 *       - name: ratingStatus
 *         in: query
 *         description: Status of the car's rating
 *         schema:
 *           type: string
 *       - name: minPrice
 *         in: query
 *         description: Minimum price for the car
 *         schema:
 *           type: number
 *       - name: maxPrice
 *         in: query
 *         description: Maximum price for the car
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               result: true
 *               listCar:
 *                 // Include sample listCar response here
 *               message: Success
 *       400:
 *         description: Failed response
 *         content:
 *           application/json:
 *             example:
 *               result: false
 *               listCar: null
 *               message: Failed
 *     security:
 *       - apiKey: []
 */

/**
 * @swagger
 * /car/api/sort-by-location-and-time:
 *   post:
 *     summary: Sort cars by location and time
 *     description: Get a list of cars sorted by location and time availability
 *     tags:
 *       - Car
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               location:
 *                 type: string
 *               timeStart:
 *                 type: string
 *               timeEnd:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved sorted list of cars
 *         content:
 *           application/json:
 *             example:
 *               result: true
 *               listCar: []
 *               message: Success
 *       400:
 *         description: Failed to retrieve sorted list of cars
 *         content:
 *           application/json:
 *             example:
 *               result: false
 *               listCar: null
 *               message: Failed
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               result: false
 *               message: Error System
 */

/**
 * @swagger
 * /car/api/get-the-most-booked-car:
 *   get:
 *     summary: Get the most booked car
 *     tags: [Car]
 *     description: Retrieve information about the most booked car.
 *     parameters:
 *       - name: isMostBooked
 *         in: query
 *         description: Flag indicating whether to get the most booked car or not
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               result: true
 *               car:
 *                 // Include sample car response here
 *               message: Success
 *       400:
 *         description: Failed response
 *         content:
 *           application/json:
 *             example:
 *               result: false
 *               car: null
 *               message: Failed
 *     security:
 *       - apiKey: []
 */

/**
 * @swagger
 * /car/api/check-car-exist:
 *   get:
 *     summary: Check if a car with a given number plate already exists
 *     description: Check if a car with a specific number plate already exists in the system
 *     tags: [Car]
 *     parameters:
 *       - in: query
 *         name: numberPlate
 *         schema:
 *           type: string
 *         required: true
 *         description: The number plate of the car to check
 *     responses:
 *       200:
 *         description: Car already exists
 *         content:
 *           application/json:
 *             example:
 *               result: true
 *               message: "CAR Already Exist"
 *       201:
 *         description: New car
 *         content:
 *           application/json:
 *             example:
 *               result: false
 *               message: "IS A NEW CAR"
 *       500:
 *         description: Error System
 *         content:
 *           application/json:
 *             example:
 *               result: false
 *               message: "Error System"
 */
/**
 * @swagger
 * tags:
 *   name: Car
 *   description: Car location management
 *
 * /car/api/get-all-location-car-by-user:
 *   get:
 *     summary: Get all car locations
 *     tags: [Car]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               result: true
 *               location:
 *                 - id: 1
 *                   name: Location 1
 *                 - id: 2
 *                   name: Location 2
 *               message: Success
 *       400:
 *         description: Failed response
 *         content:
 *           application/json:
 *             example:
 *               result: false
 *               location: null
 *               message: Failed
 */
/**
 * @swagger
 * /car/api/update-price-car:
 *   put:
 *     summary: Update the price of a car.
 *     tags: [Car]
 *     parameters:
 *       - in: query
 *         name: idCar
 *         required: true
 *         description: The ID of the car.
 *         schema:
 *           type: integer
 *       - in: body
 *         name: body
 *         description: Request body containing the new price.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             price:
 *               type: number
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               result: true
 *               car: {...}
 *               message: Update Price Car Success
 *       400:
 *         description: Unsuccessful response
 *         content:
 *           application/json:
 *             example:
 *               result: false
 *               car: null
 *               message: Failed
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Server error
 */
/**
 * @swagger
 * /car/api/get-car-by-status-of-user:
 *   get:
 *     summary: Get cars by user status
 *     description: Retrieve a list of cars based on the status of the user.
 *     tags:
 *       - Car
 *     parameters:
 *       - in: query
 *         name: idUser
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *       - in: query
 *         name: status
 *         required: true
 *         schema:
 *           type: integer
 *         description: Search car by status car
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               result: true
 *               car: {carObject}
 *               message: Success
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               result: false
 *               car: null
 *               message: Failed
 */
/**
 * @openapi
 * /car/api/get-most-booked-car-by-user:
 *   get:
 *     summary: Get the most booked car by user
 *     tags:
 *       - Car
 *     parameters:
 *       - name: idUser
 *         in: query
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: integer
 *       - name: isMostBooked
 *         in: query
 *         description: Flag to determine if it's the most booked car
 *         required: true
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               result: true
 *               car:
 *                 id: 1
 *                 numberOfBooked: 10
 *                 numberPlate: "ABC123"
 *               message: "Success"
 *       400:
 *         description: Failed
 *         content:
 *           application/json:
 *             example:
 *               result: false
 *               car: null
 *               message: "Failed"
 */