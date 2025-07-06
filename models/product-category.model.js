const mongoose = require("mongoose");

const ProductCategorySchema = mongoose.Schema(
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

const ProductCategory = mongoose.model("Category", ProductCategorySchema);
module.exports = ProductCategory;
