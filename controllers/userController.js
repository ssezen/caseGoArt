const Users = require("../models/userModel");

const userController = {
  create: async (req, res) => {
    try {
      const newuser = new Users(req.body);
      const user = await newuser.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = userController;
