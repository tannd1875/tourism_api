const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        quantity: Number,
        price: Number,
        image: String,
      },
    ],
    shippingAddress: {
      fullName: String,
      address: String,
    },
    paymentMethod: { type: String },
    paymentStatus: { type: String, default: "Pending" },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
    totalPrice: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("User", OrderSchema);
module.exports = Order;
