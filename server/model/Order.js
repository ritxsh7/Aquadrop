//mongoose
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  items: [
    {
      shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
      },

      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
      price: Number,
    },
  ],
  totalQty: Number,
  totalAmount: Number,
  timePlaced: {
    type: Date,
    default: Date.now(),
  },
  timeDelivered: Date,
  totalEarings: {
    type: Number,
    default: 0,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Order", orderSchema);
