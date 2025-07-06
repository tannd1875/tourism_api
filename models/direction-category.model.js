const mongoose = require("mongoose");

const DirectionCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const DirectionCategory = mongoose.model(
  "DirectionCategory",
  DirectionCategorySchema
);
module.exports = DirectionCategory;
