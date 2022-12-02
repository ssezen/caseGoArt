const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const server = require("../server");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  _id: {
    type: String,
    default: () => ObjectId().toString(),
  },
  walletId: {
    type: String,
    required: true,
    ref: 'Wallets',
  },
  balanceId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    ref: 'Users',
  },
  process: {
    typeProcess: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: () => server.getCurrentDateTime(),
  },
});

module.exports = mongoose.model("Transactions", PostSchema);
