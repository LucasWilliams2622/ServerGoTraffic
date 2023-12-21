const addressService = require("./AddressService");

const addNewAddress = async (
  idUser,
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
    return await addressService.addNewAddress(
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
  } catch (error) {
    return false;
  }
};

const getAddressByIdUser = async (idUser) => {
  try {
    return await addressService.getAddressByIdUser(idUser);
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
    return await addressService.updateAddress(
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
  } catch (error) {
    return false;
  }
};
const deleteAddress = async (idAddress) => {
  try {
    return await addressService.deleteAddress(idAddress);
  } catch (error) {
    return false;
  }
};
const getAddressById = async (idAddress) => {
  try {
    return await addressService.getAddressById(idAddress);
  } catch (error) {
    return false;
  }
};
const setDefaultAddress = async (id, idUser) => {
  try {
    return await addressService.setDefaultAddress(id, idUser);
  } catch (error) {
    return false;
  }
};
const getAddressDefaultByIdUser = async (idUser) => {
  try {
    return await addressService.getAddressDefaultByIdUser(idUser);
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
