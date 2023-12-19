import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Customer", "Dealer", "Admin"],
  },
  pincode: {
    type: Number,
    required: true,
  },
  address: {
    firstLine: {
      type: String,
    },
    locality: {
      type: String,
    },
    pincode: {
      type: String,
    },
  },
  orders: [
    {
      orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    },
  ],
});

const User = mongoose.model("user", userSchema);

export default User;
