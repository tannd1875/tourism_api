const mongoose = require("mongoose");

const TipScheme = mongoose.Schema({
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
});

const Tip = mongoose.model("Tip", TipScheme);
module.exports = Tip;
