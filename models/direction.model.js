const mongoose = require("mongoose");

const DirectionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },

    address: {
      type: String,
      require: true,
    },

    classify: {
      type: String,
      require: true,
      enum: [
        "Danh lam thắng cảnh",
        "Di tích lịch sử",
        "Khu vui chơi giải trí",
        "Trung tâm thương mại",
      ],
    },

    price: {
      type: Number,
      require: true,
      default: 0,
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

const Direction = mongoose.model("Direction", DirectionSchema);
module.exports = Direction;
