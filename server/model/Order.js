//mongoose
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      ShopId: {
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
});

export default mongoose.model("Order", orderSchema);
