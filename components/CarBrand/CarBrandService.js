const db = require("../../components/indexModel");
const CarBrandModel = db.carbrands;

const add = async (name, key) => {
  try {
    const brandCar = await CarBrandModel.findOne({ where: { name: name } });
    if (brandCar) {
      return false;
    }
    const newBrandCar = await CarBrandModel.create({
      name,
      key,
    });

    return newBrandCar;
  } catch (error) {
    console.log("error" + error);
    return false;
  }
};
const list = async (page, size) => {
  try {
    return await CarBrandModel.findAll();
  } catch (error) {
    console.log("List  Got an error: ", error);
    throw error;
  }
};

const deleteById = async (id) => {
  try {
    const CarBrand = await CarBrandModel.destroy({ where: { id: id } });
    return true;
  } catch (error) {
    console.log("Delete User  error", error);
    return false;
  }
};

module.exports = {
  add,
  list,
  deleteById,
};
