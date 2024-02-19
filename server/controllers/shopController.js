//models
import Shop from "../model/Shop.js";
import Product from "../model/Product.js";

//tools
import cloudinary from "cloudinary";
import { GeocodeAddress } from "../aws/geocode.js";
import User from "../model/User.js";

//===============================ENROLL SHOPS================================================

export const getAwsLocation = async (req, res) => {
  // console.log(req.body);
  const { address, pincode } = req.body;
  const location = `${address.line1}, ${address.line2}, ${address.locality}, ${address.city}, ${address.state}`;
  try {
    const geocode = await GeocodeAddress(location);
    const NearbyLocations = geocode.Locations.filter(
      (location) => location.Place.PostalCode === pincode
    ).map((location) => location.Place);

    return res.status(200).json({
      NearbyLocations,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Can't fetch locations",
    });
  }
};

export const addShop = async (req, res) => {
  try {
    //extract
    const { name, address, coordinates, pincode, area } = req.body;
    const { gstID, id } = req.user;

    // already exists
    const CheckShop = await Shop.findOne({ GST_ID: gstID })
      .populate("owner")
      .exec();
    if (CheckShop) {
      return res.status(400).json({
        success: false,
        message: "You already own a shop at Aquadrop!",
      });
    }

    // save to db
    const shop = new Shop({
      owner: id,
      GST_ID: gstID,
      name,
      address,
      pincode,
      coordinates,
    });

    const newShop = await shop.save();

    try {
      const CheckDealer = await User.findOneAndUpdate(
        { _id: id },
        { shop: newShop._id },
        { new: true }
      );
      console.log(CheckDealer);
    } catch (err) {
      console.log("Can't register your shop " + err.message);
      res.status(400).json({
        success: false,
        message: "Can't register your shop",
      });
    }

    //success
    return res.status(200).json({
      success: true,
      data: newShop,
      message: "Successfully Registered a shop",
    });
  } catch (err) {
    console.log("Can't register your shop " + err.message);
    res.status(400).json({
      success: false,
      message: "Can't register your shop",
    });
  }
};

//============================TOP SHOPS FOR HOME=========================
export const getTopShops = async (req, res) => {
  try {
    const topShops = await Shop.find({});

    res.status(200).json({
      success: true,
      data: topShops,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error while fetching shops",
    });
  }
};

//==========================NEARBY SHOPS================================
export const getNearShops = async (req, res) => {
  try {
    const response = req.body;
    console.log(response);
    const nearShops = await Shop.find({ pincode: pincode });
    console.log(nearShops);

    res.status(200).json({
      success: true,
      data: nearShops,
      message: "Succesfully fetch!",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

//======================GET SHOP BY ID=========================================
export const getShopDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const currentShop = await Shop.findOne({ name: id })
      .populate("products")
      .exec();
    // console.log(currentShop);

    res.status(200).json({
      shop: currentShop,
    });
  } catch (err) {
    console.log(err.message);
    res.status(404).json({
      message: err.message,
    });
  }
};

//=================================UPLOAD IMAGES====================
export const uploadImages = async (req, res) => {
  const { user } = req;
  if (req.file) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "Aquadrop/shop-images",
        resource_type: "image",
      });
      try {
        console.log(result.secure_url);
        const CheckShop = await Shop.findOneAndUpdate(
          { GST_ID: user.gstID },
          { image: result.secure_url }
        );
      } catch (err) {
        console.log("Failed to upload file " + err.message);
        return res
          .status(400)
          .json({ message: "Failed to save image on the server" });
      }
      return res.status(200).json({ message: "Image Uploaded succesfully" });
    } catch (err) {
      console.log("Failed to upload file " + err.message);
      return res.status(400).json({ message: "Failed to upload file" });
    }
  }
  console.log(req.file);
  return res.status(400).json({ message: "Please upload a file" });
};

//========================================ADD PRODUCTS IN THE SHOP====================
export const addProducts = async (req, res) => {
  try {
    const { name, price, image, shopId } = req.body;

    const checkProduct = await Product.findOne({
      name,
    });

    if (checkProduct) {
      return res.status(400).json({
        success: false,
        message: "Already exists",
      });
    }

    const newProduct = new Product({
      name,
      price,
      image,
    });
    await newProduct.save();

    const shop = await Shop.findOneAndUpdate(
      { _id: shopId },
      { $push: { products: newProduct._id } },
      { new: true }
    )
      .populate("products")
      .exec();
    console.log(shop);

    res.status(200).json({
      success: true,
      data: shop,
      message: "Product inserted",
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
