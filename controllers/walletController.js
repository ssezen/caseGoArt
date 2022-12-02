var request = require("request");
const Wallets = require("../models/walletModel");

const walletController = {
  create: async (req, res) => {
    try {
      const newWallet = new Wallets(req.body);
      const wallet = await newWallet.save();
      res.status(200).json(wallet);
    } catch (err) {
      res.status(400).json({ success: false });
    }
  },

  createBalance: async (req, res) => {
    try {
      var balance = {
        amount: req.body.amount,
        currency: req.body.currency,
      };
      const response = await Wallets.findOneAndUpdate(
        { _id: req.body.walletId },
        {
          $push: {
            balance: balance,
          },
        },
        { new: true }
      );
      res.status(200).json(response);
    } catch (err) {
      res.status(400).json({ success: false });
    }
  },

  listBalances: async (req, res) => {
    try {
      const balances = await Wallets.find({
        _id: req.body.walletId,
      });
      res.status(200).json(balances);
    } catch (err) {
      res.status(400).json({ msg: err });
      console.log(err);
    }
  },

  deposit: async (req, res) => {
    try {
      const response = await Wallets.findOneAndUpdate(
        { _id: req.body.walletId },
        {
          $inc: {
            ["balance.$[outer].amount"]: req.body.amount,
          },
        },
        { new: true, arrayFilters: [{ "outer._id": req.body.balanceId }] }
      );

      var data = {
        walletId: req.body.walletId,
        balanceId: req.body.balanceId,
        userId: req.body.userId,
        process: {
          typeProcess: "deposit",
          amount: req.body.amount,
        },
      };

      request.post("http://localhost:5005/transaction/addTransaction", {
        json: data,
      });

      const balance = response.balance.find(
        (balance) => balance._id == req.body.balanceId
      );

      res.status(200).json(balance);
    } catch (err) {
      res.status(400).json({ success: false, msg: err });
    }
  },

  withdraw: async (req, res) => {
    try {
      const response = await Wallets.findOneAndUpdate(
        { _id: req.body.walletId },
        {
          $inc: {
            "balance.$[outer].amount": -req.body.amount,
          },
        },
        { new: true, arrayFilters: [{ "outer._id": req.body.balanceId }] }
      );

      var data = {
        walletId: req.body.walletId,
        balanceId: req.body.balanceId,
        userId: req.body.userId,
        process: {
          typeProcess: "withdraw",
          amount: req.body.amount,
        },
      };

      request.post("http://localhost:5005/transaction/addTransaction", {
        json: data,
      });

      var balance = response.balance.find(
        (balance) => balance._id == req.body.balanceId
      );

      res.status(200).json(balance);
    } catch (err) {
      res.status(400).json({ success: false, msg: err });
    }
  },
};

module.exports = walletController;
