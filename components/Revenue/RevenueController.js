const revenueService = require("./RevenueService");

const addRevenue = async (idBooking) => {
  const result = await revenueService.addRevenue(idBooking);
  return result;
};

const getAllRevenue = async () => {
  const result = await revenueService.getAllRevenue();
  return result;
};
const getRevenueById = async (id) => {
  const result = await revenueService.getRevenueById(id);
  return result;
};
const getRevenueByIdBooking = async (idBooking) => {
  const result = await revenueService.getRevenueByIdBooking(idBooking);
  return result;
};
const getRevenueByDateRange = async (date1, date2) => {
  const result = await revenueService.getRevenueByDateRange(date1, date2);
  return result;
};
const getHighestRevenue = async () => {
  const result = await revenueService.getHighestRevenue();
  return result;
};
const getLowestRevenue = async () => {
  const result = await revenueService.getLowestRevenue();
  return result;
};

const getAverageRevenue = async () => {
  const result = await revenueService.getAverageRevenue();
  return result;
};
const getAverageRevenueArangeDate = async (from, to) => {
  const result = await revenueService.getAverageRevenueArangeDate(from, to);
  return result;
};

const deleteRevenue = async (id) => {
  const result = await revenueService.deleteRevenue(id);
  return result;
};
module.exports = {
  addRevenue,
  getAllRevenue,
  getRevenueById,
  getRevenueByIdBooking,
  getRevenueByDateRange,
  getHighestRevenue,
  getLowestRevenue,
  getAverageRevenue,
  getAverageRevenueArangeDate,
  deleteRevenue,
};
