const mongoose = require("mongoose");

const TipScheme = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    images: {
      type: [String],
      require: true,
    },
    description: {
      type: [String],
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Tip = mongoose.model("Tip", TipScheme);
module.exports = Tip;
