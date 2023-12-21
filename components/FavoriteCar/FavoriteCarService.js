const { Sequelize } = require("sequelize");
const favoriteCarModel = require("./FavoriteCarModel");
const CarModel = require("../../components/Car/CarModel");
const sequelize = new Sequelize("gotrafficdb", "root", "gotraffic&9299", {
  host: "103.57.129.166:3000",
  dialect: "mysql",
});
// const FavoriteCarModel = new favoriteCarModel(sequelize);

const db = require("../../components/indexModel");
const Car = db.cars;
const FavoriteCarModel = db.favoritecars;

const add = async (idUser, idCar) => {
  try {
    console.log("add", idUser, idCar);
    const existingFavorite = await FavoriteCarModel.findOne({
      where: {
        idUser: idUser,
        idCar: idCar,
      },
    });

    console.log("existingFavorite", existingFavorite);
    if (existingFavorite) {
      return 1;
    }

    await FavoriteCarModel.create({
      idUser,
      idCar,
    });

    return 2;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Đã xảy ra lỗi" });
  }
};

const list = async (page, size) => {
  try {
    const offset = (page - 1) * size;

    return await FavoriteCarModel.findAll({});
  } catch (error) {
    console.log("List  Got an error: ", error);
    throw error;
  }
};

const deleteById = async (idUser, idCar) => {
  try {
    const CarBrand = await FavoriteCarModel.destroy({
      where: { idUser: idUser, idCar: idCar },
    });
    if (!CarBrand) {
      return false;
    }
    return true;
  } catch (error) {
    console.log("Delete User  error", error);
    return false;
  }
};

const listByUser = async (idUser) => {
  try {
    const { Op } = require("sequelize");
    const favoriteCars = await FavoriteCarModel.findAll({
      where: { idUser: idUser },
      include: [
        {
          model: Car,
          as: "Car",
          attributes: [
            "id",
            "name",
            "price",
            "image",
            "gear",
            "fuel",
            "locationCar",
            "numberOfBooked",
            "imageThumbnail",

          ],
        },
      ],
    });

    return favoriteCars;
    return await FavoriteCarModel.findAll({
      where: {
        idUser: idUser,
      },
      include: [
        {
          model: Cars,
        },
      ],
    });
  } catch (error) {
    console.log("List  Got an error: ", error);
    throw error;
  }
};

module.exports = {
  add,
  list,
  deleteById,
  listByUser,
};
