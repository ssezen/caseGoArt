const Transactions = require("../models/transactionModel");

const transactionController = {
  create: async (req, res) => {
    const newTransaction = new Transactions(req.body);
    try {
      const transaction = await newTransaction.save();
      res.status(200).json(transaction);
    } catch (err) {
      res.status(400).json({ success: false, msg: err });
    }
  },

  list: async (req, res) => {
    try {
      const transactions = await Transactions.find({
        walletId: req.body.walletId,
      }).sort({ createdAt: -1 });
      res.status(200).json(transactions);
    } catch (err) {
      res.status(400).json({ msg: err });
      console.log(err);
    }
  },
};

module.exports = transactionController;
