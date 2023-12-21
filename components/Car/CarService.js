const { Sequelize } = require("sequelize");
const db = require("../../components/indexModel");
const CarModel = db.cars;
const UserModel = db.users;
const CarBrandModel = db.carbrands;
const ReviewModel = db.reviews;
const BookingModel = db.bookings;

//http://localhost:3000/api/car/add
const add = async (
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
) => {
  try {
    console.log("numberPlate", numberPlate);
    const existCar = await CarModel.findOne({
      where: { numberPlate: numberPlate },
    });
    console.log("existCar", existCar);
    if (existCar) {
      return false;
    }
    const car = await CarModel.create({
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
    });
    return car;
  } catch (error) {
    console.log("error" + error);
    return false;
  }
};

const listCar = async (idUser) => {
  try {
    return await CarModel.findAll({
      where: {
        isBrowed: true,
        status: 2,
        isRental: true,
        idUser: {
          [Op.ne]: idUser, // [Op.ne] là biểu thức "not equal"
        },
      },

      // limit: 10,
    });
  } catch (error) {
    return false;
  }
};

const getListCarByIdUser = async (idUser) => {
  try {
    const listCar = await CarModel.findAll({ where: { idUser: idUser } });
    if (listCar.length == 0) {
      return false;
    }

    return listCar;
  } catch (error) {
    return false;
  }
};

const getListCarByCarBrand = async (carBrand) => {
  try {
    const listCar = await CarModel.findAll({
      where: { carBrand: carBrand },
    });
    if (listCar.length == 0) {
      return false;
    }

    return listCar;
  } catch (error) {
    return false;
  }
};

const deleteCar = async (idCar) => {
  try {
    const car = await CarModel.destroy({ where: { id: idCar } });
    if (car) {
      return car;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const updateCar = async (
  idCar,
  numberPlate,
  locationCar,
  latitude,
  longitude,
  description,
  fuelConsumption,
  utilities
) => {
  try {
    const car = await CarModel.findOne({ where: { id: idCar } });

    console.log("existCar", car);
    // console.log("234", car);
    if (car) {
      car.numberPlate = numberPlate ? numberPlate : car.numberPlate;
      car.locationCar = locationCar ? locationCar : car.locationCar;
      car.latitude = latitude ? latitude : car.latitude;
      car.longitude = longitude ? longitude : car.longitude;
      car.description = description ? description : car.description;

      car.fuelConsumption = fuelConsumption
        ? fuelConsumption
        : car.fuelConsumption;
      car.utilities = utilities ? utilities : car.utilities;
      car.updatedAt = new Date();
      await car.save();
      console.log("car after", car);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
const getById = async (idCar) => {
  try {
    const car = await CarModel.findOne({
      where: { id: idCar },
      include: [
        {
          model: UserModel,
          as: "User",
          attributes: ["id", "name", "phone", "avatar", "address", "rating"],
        },
        {
          model: BookingModel,
          as: "Booking",

          attributes: ["timeFrom", "timeTo"],
        },
      ],
    });

    if (car) {
      return car;
    }

    return false;
  } catch (error) {
    return false;
  }
};

const browse = async (idCar) => {
  try {
    const carId = parseInt(idCar);
    console.log("carId", carId);
    const car = await CarModel.findOne({ where: { id: idCar } });
    if (car) {
      car.isBrowed = true;
      car.status = 2;
      car.updatedAt = new Date();
      await car.save();
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const updateImageCar = async (
  idCar,
  image,
  imageThumbnail,
  imageRegister,
  imageRegistry,
  imageInsurance
) => {
  try {
    const car = await CarModel.findOne({ where: { id: idCar } });
    console.log("car", car);
    if (car) {
      car.image = image ? image : car.image;
      car.imageRegister = imageRegister ? imageRegister : car.imageRegister;
      car.imageThumbnail = imageThumbnail ? imageThumbnail : car.imageThumbnail;

      car.imageRegistry = imageRegistry ? imageRegistry : car.imageRegistry;
      car.imageInsurance = imageInsurance ? imageInsurance : car.imageInsurance;
      await car.save();
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const updatePriceCar = async (idCar, price) => {
  try {
    const car = await CarModel.findOne({ where: { id: idCar } });
    if (car) {
      car.price = price ? price : car.price;
      await car.save();
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const searchByCity = async (city, district, ward) => {
  try {
    const { Op } = require("sequelize");
    const car = await CarModel.findAll({
      limit: 10,
      where: {
        city: {
          [Op.substring]: city,
        },
        district: {
          [Op.substring]: district,
        },
        ward: {
          [Op.substring]: ward,
        },
      },
      include: [
        {
          model: UserModel,
          as: "User",
          attributes: ["id", "name", "phone", "avatar", "address", "rating"],
        },
      ],
    });

    if (car) {
      return car;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const getCarByCity = async (city) => {
  try {
    const { Op } = require("sequelize");
    const car = await CarModel.findAll({
      limit: 10,
      where: {
        city: {
          [Op.substring]: city,
        },
      },
      include: [
        {
          model: UserModel,
          as: "User",
          attributes: ["id", "name", "phone", "avatar", "address", "rating"],
        },
      ],
    });

    if (car) {
      return car;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const { Op } = require("sequelize");

const getSortedCars = async (
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
) => {
  // Xây dựng điều kiện tìm kiếm dựa trên các tham số đầu vào
  const whereCondition = {
    carBrand: carBrand ? carBrand : "Vinfast",
    yearOfManufacture: yearOfManufacture
      ? yearOfManufacture
      : { [Op.gte]: 2000 },
    seats: seats ? seats : { [Op.gte]: 3 },
    gear: gear ? gear : "Tự động",
    fuel: fuel ? fuel : "Xăng",
    isDelivery: isDelivery !== undefined ? isDelivery : false,
    withDriver: withDriver !== undefined ? withDriver : false,
    rating: rating ? rating : { [Op.gte]: 0 },
    price: {
      [Op.and]: [
        minPrice !== undefined ? { [Op.gte]: minPrice } : 0,
        maxPrice !== undefined ? { [Op.lte]: maxPrice } : 10000000,
      ].filter((item) => item !== undefined),
    },
  };

  console.log("whereCondition", whereCondition);

  const result = await db.cars.findAll({ where: whereCondition });
  console.log("result", result);
  if (result) {
    return result;
  }
  return false;
};

const getNotBrowseCar = async () => {
  try {
    const { Op } = require("sequelize");
    const cars = await CarModel.findAll({
      where: {
        isBrowed: false,
        status: [1, 2],
      },
      include: [
        {
          model: UserModel,
          as: "User",
          attributes: ["id", "name", "phone", "avatar", "address", "rating"],
        },
      ],
    });
    console.log(cars.length);
    if (cars) {
      return cars;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const refuseCar = async (idCar) => {
  try {
    const car = await CarModel.findOne({ where: { id: idCar } });
    if (car) {
      car.status = 3;
      await car.save();
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const updateSurchargeCar = async (
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
) => {
  try {
    const car = await CarModel.findOne({ where: { id: idCar } });
    if (car) {
      car.limitKmStatus = limitKmStatus ? limitKmStatus : car.limitKmStatus;
      car.maxKm = maxKm ? maxKm : car.maxKm;
      car.exceededFee = exceededFee ? exceededFee : car.exceededFee;

      car.overtimeStatus = overtimeStatus ? overtimeStatus : car.overtimeStatus;
      car.overtimeCharge = overtimeCharge ? overtimeCharge : car.overtimeCharge;
      car.overtimeDay = overtimeDay ? overtimeDay : car.overtimeDay;

      car.carCleanStatus = carCleanStatus ? carCleanStatus : car.carCleanStatus;
      car.carCleanFee = carCleanFee ? carCleanFee : car.carCleanFee;

      car.carDeodorizerStatus = carDeodorizerStatus
        ? carDeodorizerStatus
        : car.carDeodorizerStatus;
      car.carDeodorizerFee = carDeodorizerFee
        ? carDeodorizerFee
        : car.carDeodorizerFee;

      await car.save();
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const updateDeliveredOnSite = async (
  idCar,
  isDelivery,
  deliveryWithin,
  deliveryFee,
  freeDeliveryWithin
) => {
  try {
    const car = await CarModel.findOne({ where: { id: idCar } });
    console.log(
      "car",
      idCar,
      isDelivery,
      deliveryWithin,
      deliveryFee,
      freeDeliveryWithin
    );
    if (car) {
      car.isDelivery = isDelivery ? isDelivery : car.isDelivery;
      car.deliveryWithin = deliveryWithin ? deliveryWithin : car.deliveryWithin;
      car.deliveryFee = deliveryFee ? deliveryFee : car.deliveryFee;
      car.freeDeliveryWithin = freeDeliveryWithin
        ? freeDeliveryWithin
        : car.freeDeliveryWithin;
      await car.save();
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const getCarHasDriver = async () => {
  try {
    const cars = await CarModel.findAll({
      where: {
        isBrowed: true,
        withDriver: true,
      },
      include: [
        {
          model: UserModel,
          as: "User",
          attributes: ["id", "name", "phone", "avatar", "address", "rating"],
        },
        {
          model: BookingModel,
          as: "Booking",

          attributes: ["timeFrom", "timeTo"],
        },
      ],
    });
    if (cars) {
      return cars;
    }
    return false;
  } catch (error) {
    return false;
  }
};
const getSortedCarsByLocationAndTime = async (
  type,
  location,
  timeStart,
  timeEnd
) => {
  try {
    // Tìm kiếm xe có địa điểm trùng khớp
    const cars = await db.cars.findAll({
      where: {
        withDriver: type === "withDriver" ? true : [true, false],
        isBrowed: true,
        locationCar: {
          [Op.like]: `%${location}%`,
        },
      },
    });

    // Lọc ra những xe chưa được booking trong khoảng thời gian
    const availableCars = await Promise.all(
      cars.map(async (car) => {
        const overlappingBookings = await db.bookings.findAll({
          where: {
            idCar: car.id,
            [Op.or]: [
              {
                timeFrom: {
                  [Op.between]: [timeStart, timeEnd],
                },
              },
              {
                timeTo: {
                  [Op.between]: [timeStart, timeEnd],
                },
              },
              {
                [Op.and]: [
                  { timeFrom: { [Op.lte]: timeStart } },
                  { timeTo: { [Op.gte]: timeEnd } },
                ],
              },
            ],
          },
        });

        if (overlappingBookings.length === 0) {
          return car;
        }

        return null;
      })
    );

    // Lọc bỏ những xe null (đã được booking trong khoảng thời gian)
    const filteredCars = availableCars.filter((car) => car !== null);

    return {
      availableCarsLength: filteredCars.length,
      availableCars: filteredCars,
    };
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getTheMostBookedCar = async (isTheMost) => {
  try {
    const orderDirection = isTheMost ? "DESC" : "ASC";

    // Thực hiện truy vấn để lấy danh sách xe được đặt nhiều nhất hoặc ít nhất
    const cars = await db.cars.findAll({
      order: [["numberOfBooked", orderDirection]],
      attributes: ["id", "idUser", "numberPlate", "numberOfBooked"],
    });
    if (cars.length == 0) {
      return false;
    }
    return cars;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const checkCarExist = async (numberPlate) => {
  try {
    const car = await CarModel.findAll({
      where: {
        numberPlate: numberPlate,
      },
    });

    console.log("car", car);
    if (car.length > 0) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getAllLocation = async (idUser) => {
  try {
    const cars = await db.cars.findAll({
      where: {
        idUser: idUser,
      },
      attributes: ["locationCar", "latitude", "longitude", "id", "numberPlate"],
    });
    if (cars.length == 0) {
      return false;
    }
    return cars;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getCarByStatusOfUser = async (idUser, status) => {
  try {
    const cars = await db.cars.findAll({
      where: {
        idUser: idUser,
        status: status,
      },
    });
    if (cars.length == 0) {
      return false;
    }
    return cars;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getMostBookedCarByUser = async (idUser, isMostBooked) => {
  try {
    const orderDirection = isMostBooked == true ? "DESC" : "ASC";
    const cars = await db.cars.findAll({
      where: {
        idUser: idUser,
      },
      order: [["numberOfBooked", orderDirection]],
      attributes: ["id", "idUser", "numberPlate", "numberOfBooked"],
    });
    if (cars.length == 0) {
      return false;
    }
    return cars;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = {
  add,
  getListCarByIdUser,
  getListCarByCarBrand,
  deleteCar,
  updateCar,
  listCar,
  getById,
  browse,
  updateImageCar,
  searchByCity,
  getCarByCity,
  getSortedCars,
  getNotBrowseCar,
  refuseCar,
  updateSurchargeCar,
  updateDeliveredOnSite,
  getCarHasDriver,
  getSortedCarsByLocationAndTime,
  getTheMostBookedCar,
  checkCarExist,
  getAllLocation,
  updatePriceCar,
  getCarByStatusOfUser,
  getMostBookedCarByUser,
};
