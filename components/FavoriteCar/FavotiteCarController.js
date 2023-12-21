const favoriteCarService = require("./FavoriteCarService");

const add = async (idUser, idCar) => {
  try {
    return await favoriteCarService.add(idUser, idCar);
  } catch (error) {
    return false;
  }
};

const list = async (page, size) => {
  try {
    return await favoriteCarService.list(page, size);
  } catch (error) {
    throw error;
  }
};

const deleteById = async (idUser, idCar) => {
  try {
    return await favoriteCarService.deleteById(idUser, idCar);
  } catch (error) {
    return false;
  }
};

const listByUser = async (idUser) => {
  try {
    return await favoriteCarService.listByUser(idUser);
  } catch (error) {
    throw error;
  }
};
module.exports = {
  add,
  list,
  deleteById,
  listByUser,
};
