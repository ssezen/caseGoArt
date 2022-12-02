const bodyparser = require("body-parser");
const express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");
const { URI } = require("./.env");
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyparser.json());

module.exports = {
  getCurrentDateTime: function () {
    var time = Date.now() + 3 * 60 * 60 * 1000;
    return new Date(time);
  },
};

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });

const userRoute = require("./routes/userRoute");
const walletRoute = require("./routes/walletRoute");
const transactionRoute = require("./routes/transactionRoute");

app.use("/user", userRoute);
app.use("/wallet", walletRoute);
app.use("/transaction", transactionRoute);

const PORT = process.env.PORT || 5005;

module.exports = app.listen(PORT, () => console.log("Server run!"));
