const mongoose = require("mongoose");

const DirectionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    province: {
      type: mongoose.Schema.ObjectId,
      ref: "Province",
      required: true,
    },
    detailAddress: {
      type: String,
      required: true,
      trim: true,
    },
    classify: {
      type: mongoose.Schema.ObjectId,
      ref: "DirectionCategory",
      required: true,
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    images: {
      type: [String],
      required: true,
    },

    description: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Direction = mongoose.model("Direction", DirectionSchema);
module.exports = Direction;
