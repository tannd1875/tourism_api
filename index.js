require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const directionRoute = require("./routes/direction.route");
const tipRoute = require("./routes/tip.route");

//midleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//route
app.use("/direction", directionRoute);
app.use("/tip", tipRoute);

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("Connected to DB");
    app.listen(5001, () => {
      console.log("Server on 5001!");
    });
  })
  .catch(() => {
    console.log("fail");
  });
