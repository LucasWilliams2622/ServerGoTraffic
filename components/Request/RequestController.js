const RequestService = require("./RequestService");

const getAllRequest = async () => {
  const result = await RequestService.getAllRequest();
  return result;
};

const getRequestById = async (id) => {
  const result = await RequestService.getRequestById(id);
  return result;
};

const createRequest = async (idUser, bankName, bankNumber, amount) => {
  const result = await RequestService.createRequest(
    idUser,
    bankName,
    bankNumber,
    amount
  );
  return result;
};

const accpetRequest = async (id) => {
  const result = await RequestService.accpetRequest(id);
  return result;
};

const deleteRequest = async (id) => {
  const result = await RequestService.deleteRequest(id);
  return result;
};

const rejectRequest = async (id) => {
  const result = await RequestService.rejectRequest(id);
  return result;
};

const getListRequestByUser = async (idUser) => {
  const result = await RequestService.getListRequestByUser(idUser);
  return result;
};

const getListRejectRequestByUser = async (idUser) => {
  const result = await RequestService.getListRejectRequestByUser(idUser);
  return result;
};

const getListAcceptRequestByUser = async (idUser) => {
  const result = await RequestService.getListAcceptRequestByUser(idUser);
  return result;
};

const getListReject = async () => {
  const result = await RequestService.getListReject();
  return result;
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
