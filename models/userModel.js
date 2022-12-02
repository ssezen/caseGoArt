const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const server = require("../server");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  _id: {
    type: String,
    required: true,
    default: () => ObjectId().toString(),
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => server.getCurrentDateTime(),
  },
});

module.exports = mongoose.model("Users", PostSchema);
