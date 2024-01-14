import mongoose from "mongoose";

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
  },
  role: {
    type: String,
    enum: ["Customer", "Dealer", "Admin"],
  },
  phone: {
    type: String,
  },
  gstID: {
    type: String,
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  shops: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
    },
  ],
});

const User = mongoose.model("user", userSchema);

export default User;
