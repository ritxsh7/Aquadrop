//models
import Shop from "../model/Shop.js";
import Product from "../model/Product.js";

//tools
import cloudinary from "cloudinary";

//========================ENROLL SHOPS================================================

export const addShop = async (req, res) => {
  try {
    //extract
    const { id } = req.params;
    const { name, address, pincode, GST_ID } = req.body;

    // already exists
    const checkShop = await Shop.findOne({ GST_ID }).populate("owner").exec();
    if (checkShop) {
      return res.status(400).json({
        success: false,
        message: "Shop Already exists!",
      });
    }

    const { result, error } = await uploadImages(req.file.path, name);
    if (result) {
      console.log(result);
    }
    if (error) {
      console.log(error);
    }

    // save to db
    const shop = new Shop({
      owner: id,
      GST_ID,
      name,
      address,
      pincode,
      img: result,
    });

    const newShop = await shop.save();

    //success
    return res.status(200).json({
      success: true,
      data: newShop,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
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
const uploadImages = async (url, id) => {
  try {
    const result = await cloudinary.v2.uploader.upload(url, {
      public_id: id,
      folder: "Aquadrop/shop-images/",
    });
    return { result: result.secure_url };
  } catch (error) {
    return { error };
  }
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
