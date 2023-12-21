const db = require("../../components/indexModel");
const ReviewModel = db.reviews;
const moment = require("moment");
const current = moment().format("YYYY-MM-DD HH:mm:ss");

const add = async (idBooking, timeReview, content, rating) => {
  try {
    const booking = await db.bookings.findOne({
      where: { id: idBooking, status: 6 },
    });
    if (!booking) {
      return false;
    }

    // Lấy thông tin xe và người đặt xe từ booking
    const car = await db.cars.findOne({
      where: { id: booking.idCar },
      include: [
        {
          model: db.users,
          as: "User",
          attributes: ["id", "name", "avatar"],
        },
      ],
    });
    const user = await db.users.findOne({ where: { id: booking.idUser } });
    const newReview = await ReviewModel.create({
      idBooking,
      timeReview,
      content,
      rating,
    });
    // Cập nhật số sao của xe
    const totalReviews = await db.reviews.count({ where: { idBooking } });
    console.log("totalReviews " + totalReviews);
    const totalRating = await db.reviews.sum("rating", {
      where: { idBooking },
    });
    console.log("totalRating " + totalRating);
    const averageRating = totalRating / totalReviews;
    console.log("averageRating " + averageRating);
    await db.cars.update(
      { rating: averageRating },
      { where: { id: booking.idCar } }
    );
    await car.save();
    return newReview;
  } catch (error) {
    console.log("error" + error);
    return false;
  }
};

const list = async (page, size) => {
  try {
    const reviews = await ReviewModel.findAll({});
    if (reviews.length > 0) {
      return reviews;
    }
    return false;
  } catch (error) {
    console.log("error" + error);
    return false;
  }
};

const deleteById = async (id) => {
  try {
    const review = await db.reviews.findByPk(id);
    if (!review) {
      return false;
    }

    // Lấy thông tin booking từ review
    const booking = await db.bookings.findOne({
      where: { id: review.idBooking },
    });
    if (!booking) {
      return false;
    }
    console.log("bookingid" + booking.id);
    // Xóa review
    await review.destroy();

    // Cập nhật số sao của xe
    const totalReviews = await db.reviews.count({
      where: { idBooking: booking.id },
    });
    const totalRating = await db.reviews.sum("rating", {
      where: { idBooking: booking.id },
    });
    const averageRating = totalRating / totalReviews;
    const car = await db.cars.findOne({ where: { id: booking.idCar } });
    await db.cars.update(
      { rating: averageRating },
      { where: { id: booking.idCar } }
    );
    await car.save();
    return review;
  } catch (error) {
    console.log("error" + error);
    return false;
  }
};

const updateById = async (id, idBooking, timeReview, content, rating) => {
  try {
    const review = await db.reviews.findByPk(id);
    if (!review) {
      return false;
    }
    // Lấy thông tin booking từ review
    const booking = await db.bookings.findOne({
      where: { id: review.idBooking },
    });
    if (!booking) {
      return false;
    }
    await ReviewModel.update(
      { idBooking, timeReview: current, content, rating },
      { where: { id } }
    );

    // Cập nhật số sao của xe
    const totalReviews = await db.reviews.count({
      where: { idBooking: booking.id },
    });
    const totalRating = await db.reviews.sum("rating", {
      where: { idBooking: booking.id },
    });
    const averageRating = totalRating / totalReviews;
    const car = await db.cars.findOne({ where: { id: booking.idCar } });
    await db.cars.update(
      { rating: averageRating },
      { where: { id: booking.idCar } }
    );
    await car.save();
    return review;
  } catch (error) {
    console.log("error" + error);
    return false;
  }
};

const getById = async (id) => {
  try {
    const review = await ReviewModel.findOne({ where: { id } });
    if (!review) {
      return false;
    }
    return review;
  } catch (error) {
    console.log("error" + error);
    return false;
  }
};

// const getByBookingId = async (idBooking) => {
//   try {
//     const review = await ReviewModel.findAll({ where: { idBooking } });
//     const booking = await db.bookings.findOne({ where: { id: idBooking } });
//     const user = await db.users.findOne({ where: { id: booking.idUser } });
//     if (!review) {
//       return false;
//     }
//     return review;
//   } catch (error) {
//     console.log("error" + error);
//     return false;
//   }
// };
const getByBookingId = async (idBooking) => {
  try {
    const review = await ReviewModel.findAll({ where: { idBooking } });
    if (!review || review.length === 0) {
      return false;
    }

    const booking = await db.bookings.findOne({ where: { id: idBooking } });
    const user = await db.users.findOne({ where: { id: booking.idUser } });

    // Join the review data with user data
    const reviewWithUser = review.map((r) => ({
      id: r.id,
      idBooking: r.idBooking,
      review,
      // booking,
      user:{
        id: user.id,
       
      },
    }));

    return reviewWithUser;
  } catch (error) {
    console.log("error" + error);
    return false;
  }
};

const getByIdUser = async (idUser) => {
  try {
    // Tìm tất cả các booking của người dùng
    const bookings = await db.bookings.findAll({ where: { idUser } });
    if (!bookings) {
      return false;
    }
    // Lấy danh sách idBooking từ các booking
    const idBookings = bookings.map((booking) => booking.idBooking);
    // Tìm tất cả các bài review dựa trên idBooking
    const reviews = await db.reviews.findAll({
      where: { idBooking: idBookings },
    });
    if (!reviews) {
      return false;
    }
    return reviews;
  } catch (error) {
    console.log("error" + error);
    return false;
  }
};

const getByIdCar = async (idCar) => {
  try {
    // Tìm tất cả các booking của xe
    const bookings = await db.bookings.findAll({
      where: { idCar },
      include: [
        {
          model: db.cars,
          as: "Car",
          attributes: ["id", "name", "numberOfBooked", "rating"],
        },
      ],
    });

    // Lấy thông tin xe và các bài review từ đối tượng bookings
    const car = bookings[0].Car;
    console.log("Car:", car);
    // Lấy danh sách idBooking từ các booking
    const idBookings = bookings.map((booking) => booking.idBooking);

    // Tìm tất cả các bài review dựa trên idBooking
    const reviews = await db.reviews.findAll({
      where: { idBooking: idBookings },
    });

    return reviews;
  } catch (error) {
    console.log("error" + error);
    return false;
  }
};

const sortByRating = async (page, size) => {
  try {
    const reviews = await ReviewModel.findAll({
      order: [["rating", "DESC"]],
    });
    return reviews;
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
  getByIdUser,
  getByIdCar,
  sortByRating,
};
