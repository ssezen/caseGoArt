const express = require("express");
const router = express.Router();
const walletController = require("../controllers/walletController");

router.post("/addWallet", walletController.create);
router.patch("/addBalance", walletController.createBalance);
router.get("/listBalance", walletController.listBalances);
router.patch("/deposit", walletController.deposit);
router.patch("/withdraw", walletController.withdraw);

module.exports = router;
