import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

export const cloudConnect = () => {
  try {
    cloudinary.config({
      cloud_name: "dnwvxhwyv",
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  } catch (err) {
    console.log(err.message);
  }
};
