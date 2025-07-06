const mongoose = require("mongoose");

const ProvinceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Province = new mongoose.model("Province", ProvinceSchema);
module.exports = Province;
