const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/addUser", userController.create);

module.exports = router;
