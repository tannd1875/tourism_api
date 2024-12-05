const mongoose = require("mongoose");
const directionModel = require("./models/direction.model");
const tipModel = require("./models/tip.model");
const { directionList, tipList } = require("./data");
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

const seedData = async () => {
  try {
    await directionModel.deleteMany();
    await tipModel.deleteMany();

    const directions = await directionModel.insertMany(directionList);
    const tips = await tipModel.insertMany(tipList);
    if (!directions) {
      console.log("Init direction fail!");
    } else {
      console.log("Import directions success!");
    }
    if (!tips) {
      console.log("Init tip fail!");
    } else {
      console.log("Import tips success!");
    }
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedData();
