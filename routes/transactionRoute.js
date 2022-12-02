const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");

router.post("/addTransaction", transactionController.create);
router.get("/listTransactions", transactionController.list);

module.exports = router;
