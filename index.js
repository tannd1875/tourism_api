require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const directionRoute = require("./routes/direction.route");
const tipRoute = require("./routes/tip.route");
const userRoute = require("./routes/user.route");
const productRoute = require("./routes/product.route");
const provinceRoute = require("./routes/province.route");
const directionCategoryRoute = require("./routes/direction-category.route");
const brandRoute = require("./routes/brand.route");
const productCategoryRoute = require("./routes/product-category.route");
const cartRoute = require("./routes/cart.route");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static("uploads"));

//route
app.use("/direction", directionRoute);
app.use("/tip", tipRoute);
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/province", provinceRoute);
app.use("/direction-category", directionCategoryRoute);
app.use("/brand", brandRoute);
app.use("/product-category", productCategoryRoute);
app.use("/cart", cartRoute);

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
