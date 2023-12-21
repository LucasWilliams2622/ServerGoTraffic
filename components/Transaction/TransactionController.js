const db = require("../../components/indexModel");
const TransactionModel = db.transactions;
const moment = require("moment");
const current = moment().format("YYYY-MM-DD HH:mm:ss");

const createTransaction = async (idUser, amount, transactionType) => {
  try {
    const transaction = await TransactionModel.create({
      idUser,
      amount,
      transactionType,
      timastamp: current,
    });
    return transaction;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getTransactionById = async (id) => {
  try {
    const transaction = await TransactionModel.findOne({
      where: { id },
    });
    return transaction;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getAllTransaction = async () => {
  try {
    const transactions = await TransactionModel.findAll();
    return transactions;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getTransactionByUserId = async (idUser) => {
  try {
    const transactions = await TransactionModel.findAll({
      where: { idUser },
    });
    return transactions;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getTransactionByType = async (transactionType) => {
  try {
    const transactions = await TransactionModel.findAll({
      where: { transactionType },
    });
    return transactions;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const deleteTransactionById = async (id) => {
  try {
    const transaction = await TransactionModel.destroy({
      where: { id },
    });
    return transaction;
  } catch (err) {
    console.log(err);
    return null;
  }
};
module.exports = {
  createTransaction,
  getTransactionById,
  getAllTransaction,
  getTransactionByUserId,
  getTransactionByType,
  deleteTransactionById,
};
