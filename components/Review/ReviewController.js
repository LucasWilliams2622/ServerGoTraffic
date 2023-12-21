const reviewService = require("./ReviewService");

const add = async (idBooking, timeReview, content, rating) => {
  try {
    const review = await reviewService.add(
      idBooking,
      timeReview,
      content,
      rating
    );
    return review;
  } catch (error) {
    console.log("error" + error);
    return false;
  }
};

const list = async (page, size) => {
  try {
    return await reviewService.list(page, size);
  } catch (error) {
    console.log("List  Got an error: ", error);
    throw error;
  }
};

const deleteById = async (id) => {
  try {
    const review = await reviewService.deleteById(id);
    return true;
  } catch (error) {
    console.log("Delete User  error", error);
    return false;
  }
};

const updateById = async (id, idBooking, timeReview, content, rating) => {
  try {
    const review = await reviewService.updateById(
      id,
      idBooking,
      timeReview,
      content,
      rating
    );
    return review;
  } catch (error) {
    console.log("error" + error);
    return false;
  }
};

const getById = async (id) => {
  try {
    const review = await reviewService.getById(id);
    return review;
  } catch (error) {
    console.log("error" + error);
    return false;
  }
};

const getByBookingId = async (idBooking) => {
  try {
    const review = await reviewService.getByBookingId(idBooking);
    return review;
  } catch (error) {
    console.log("error" + error);
    return false;
  }
};

const getByUserId = async (idUser) => {
  try {
    const review = await reviewService.getByIdUser(idUser);
    return review;
  } catch (error) {
    console.log("error" + error);
    return false;
  }
};

const getByIdCar = async (idCar) => {
  try {
    const review = await reviewService.getByIdCar(idCar);
    return review;
  } catch (error) {
    console.log("error" + error);
    return false;
  }
};
const sortByRating = async () => {
  try {
    const review = await reviewService.sortByRating();
    return review;
  } catch (error) {
    console.log("error" + error);
    return false;
  }
};

module.exports = {
  add,
  list,
  deleteById,
  updateById,
  getById,
  getByBookingId,
  getByUserId,
  getByIdCar,
  sortByRating,
};
