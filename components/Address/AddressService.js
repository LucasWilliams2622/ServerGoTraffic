const { Sequelize } = require("sequelize");
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

// const addNewAddress = async (
//   idUser,
//   city,
//   district,
//   ward,
//   street,
//   number,
//   note,
//   address,
//   isDefault
// ) => {
//   try {
//     const addressExist = await AddressModel.findAll({
//       where: {
//         idUser,
//       },
//     });

//     console.log(address);
//     if (addressExist.length > 0) {
//       const result = await AddressModel.create({
//         idUser,
//         city,
//         district,
//         ward,
//         street,
//         number,
//         note,
//         address,
//         isDefault,
//       });
//       return result;
//     } else {
//       const result = await AddressModel.create({
//         idUser,
//         city,
//         district,
//         ward,
//         street,
//         number,
//         note,
//         address,
//         isDefault: true,
//       });
//       return result;
//     }
//   } catch (error) {
//     return false;
//   }
// };
const addNewAddress = async (
  idUser,
      city,
      district,
      ward,
      street,
      number,
      note,
      address,
      isDefault,
) => {
  const transaction = await sequelize.transaction(); // Khởi tạo transaction

  try {
    // Tìm tất cả các địa chỉ của người dùng
    const existingAddresses = await AddressModel.findAll({
      where: {
        idUser,
      },
    });

    if (existingAddresses.length === 0) {
      // Nếu người dùng chưa có địa chỉ nào, đặt isDefault là true
      isDefault = true;
    } else if (isDefault) {
      // Nếu địa chỉ mới là default, cập nhật tất cả các địa chỉ khác thành false
      await AddressModel.update(
        { isDefault: false },
        {
          where: {
            idUser,
            isDefault: true, // Chỉ cập nhật nếu địa chỉ cũ là default
          },
          transaction,
        }
      );
    }

    // Thêm địa chỉ mới
    const result = await AddressModel.create(
      {
        idUser,
        city,
        district,
        ward,
        street,
        number,
        note,
        address,
        isDefault,
      },
      { transaction }
    );

    // Commit transaction nếu mọi thứ thành công
    await transaction.commit();

    return result;
  } catch (error) {
    // Rollback transaction nếu có lỗi
    await transaction.rollback();
    return false;
  }
};

const getAddressByIdUser = async (idUser) => {
  try {
    const result = await AddressModel.findAll({
      where: {
        idUser,
      },
    });
    if (result.length > 0) return result;
    return false;
  } catch (error) {
    return false;
  }
};

const updateAddress = async (
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
) => {
  try {
   
    if (isDefault) {
      await AddressModel.update(
        { isDefault: false },
        {
          where: {
            idUser,
            id: { [Sequelize.Op.not]: id }, // Exclude the current address being updated
          },
        }
      );
    }

    const result = await AddressModel.update(
      {
        city,
        district,
        ward,
        street,
        number,
        note,
        address,
        isDefault,
      },
      {
        where: {
          idUser,
          id,
        },
      }
    );
    console.log(result);
    if (result) return result;
    return false;
  } catch (error) {
    return false;
  }
};

const getAddressById = async (id) => {
  try {
    const result = await AddressModel.findOne({
      where: {
        id,
      },
    });
    if (result) return result;
    return false;
  } catch (error) {
    return false;
  }
};

const deleteAddress = async (idAddress) => {
  try {
    const result = await AddressModel.destroy({
      where: {
        id: idAddress,
      },
    });
    if (result) return result;
    return false;
  } catch (error) {
    return false;
  }
};

const setDefaultAddress = async (idAddress, idUser) => {
  try {
    // Set all addresses except the new one to false
    await AddressModel.update(
      { isDefault: false },
      {
        where: {
          idUser,
        },
      }
    );

    // Set the new address to true
    const result = await AddressModel.update(
      { isDefault: true },
      {
        where: {
          id: idAddress,
          idUser,
        },
      }
    );

    if (result) return result;
    return false;
  } catch (error) {
    return false;
  }
};

const getAddressDefaultByIdUser = async (idUser) => {
  try {
    const result = await AddressModel.findOne({
      where: {
        idUser,
        // isDefault: true,
      },
    });
    console.log(result);
    if (result) return result;
    return false;
  } catch (error) {
    return false;
  }
};

module.exports = {
  addNewAddress,
  getAddressByIdUser,
  updateAddress,
  deleteAddress,
  getAddressById,
  setDefaultAddress,
  getAddressDefaultByIdUser,
};
