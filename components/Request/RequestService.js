const { Sequelize, where } = require("sequelize");
const sequelize = new Sequelize("gotrafficdb", "root", "gotraffic&9299", {
  host: "103.57.129.166:3000",
  dialect: "mysql",
});
const db = require("../../components/indexModel");
const CarModel = db.cars;
const UserModel = db.users;
const CarBrandModel = db.carbrands;
const ReviewModel = db.reviews;
const BookingModel = db.bookings;
const NotificationModel = db.notifications;
const AddressModel = db.addresses;
const RequestModel = db.requests;

const getAllRequest = async () => {
  try {
    const result = await RequestModel.findAll(
      {
        where: {
          status: 1,
        },
       
      },
      { order: [["id", "DESC"]] }
    
    );
    return result;
  } catch (error) {
    return false;
  }
};

const getRequestById = async (id) => {
  try {
    const result = await RequestModel.findOne({
      where: {
        id,
      },
    });
    return result;
  } catch (error) {
    return false;
  }
};

const createRequest = async (idUser, bankName, bankNumber, amount) => {
  try {
    const result = await RequestModel.create({
      idUser,
      bankName,
      bankNumber,
      amount,
      status: 1,
    });
    if (!result) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};

const accpetRequest = async (id) => {
  try {
    const result = await RequestModel.update(
      {
        status: 2,
      },
      {
        where: {
          id,
        },
      }
    );
    if (!result) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

const deleteRequest = async (id) => {
  try {
    const result = await RequestModel.destroy({
      where: {
        id,
      },
    });
    if (!result) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};

const rejectRequest = async (id) => {
  try {
    const result = await RequestModel.update(
      {
        status: 3,
      },
      {
        where: {
          id,
        },
      }
    );
    if (!result) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

const getListRequestByUser = async (idUser) => {
  try {
    const result = await RequestModel.findAll({
      where: {
        idUser,
      },
    });
    return result;
  } catch (error) {
    return false;
  }
};

const getListRejectRequestByUser = async (idUser) => {
  try {
    const result = await RequestModel.findAll({
      where: {
        idUser,
        status: 3,
      },
    });
    return result;
  } catch (error) {
    return false;
  }
};

const getListAcceptRequestByUser = async (idUser) => {
  try {
    const result = await RequestModel.findAll({
      where: {
        idUser,
        status: 2,
      },
    });
    return result;
  } catch (error) {
    return false;
  }
};

const getListReject = async () => {
  try {
    const result = await RequestModel.findAll({
      where: {
        status: 3,
      },
    });
    return result;
  } catch (error) {
    return false;
  }
};


module.exports = {
  getAllRequest,
  getRequestById,
  createRequest,
  accpetRequest,
  deleteRequest,
  rejectRequest,
  getListRequestByUser,
  getListRejectRequestByUser,
  getListAcceptRequestByUser,
  getListReject,

};
