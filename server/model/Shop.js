import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  enrollId: {
    type: Number,
    require: true,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: Date.now(),
  },
  image: {
    type: String,
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      content: {
        type: String,
      },
    },
  ],
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  pincode: {
    type: String,
    required: true,
  },
  address: {
    shop: {
      No: {
        type: Number,
      },
      building: {
        type: String,
      },
    },
    street: {
      type: String,
    },
    area: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      default: "Maharashtra",
    },
    country: {
      type: String,
      default: "India",
    },
  },
});

export default mongoose.model("Shop", shopSchema);
