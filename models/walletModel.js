const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const server = require("../server");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  _id: {
    type: String,
    default: () => ObjectId().toString(),
  },
  nameWallet: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    ref: "Users",
  },
  balance: [
    {
      _id: {
        type: String,
        default: () => ObjectId().toString(),
      },
      amount: {
        type: Number,
      },
      currency: {
        type: String,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: () => server.getCurrentDateTime(),
  },
});

module.exports = mongoose.model("Wallets", PostSchema);
