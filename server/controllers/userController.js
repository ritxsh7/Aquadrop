import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//models
import User from "../model/User.js";
import Order from "../model/Order.js";
import mongoose from "mongoose";

//==============================SIGNUP==================================

export const userSignUp = async (request, respose) => {
  try {
    //extract data from request
    const { name, email, password, role, pincode } = request.body;

    //check if useralready exists
    const checkUser = await User.findOne({ email: email, role: role });
    if (checkUser) {
      return respose.status(400).json({
        message: "User already exists!",
      });
    }

    //hash password using bcrypt
    try {
      var hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      respose.status(400).json({
        success: false,
        error: err.message,
      });
    }

    //create new user
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
      pincode: pincode,
    });
    await newUser.save();

    respose.status(200).json({
      success: true,
      data: { name, email },
      message: "successful signup",
    });
  } catch (error) {
    console.log(error);
    respose.status(400).json({
      message: "Something went wrong!!",
    });
  }
};

//==============================LOGIN==================================
export const userLogin = async (req, res) => {
  try {
    const user = req.body;

    //find the user using email
    const checkUser = await User.findOne({ email: user.email });

    //if user deosnt exists then show msg
    if (!checkUser) {
      return res.status(300).json({
        message: "User doesnt exist !",
      });
    }

    //compare passwords
    if (await bcrypt.compare(user.password, checkUser.password)) {
      //if passwords match

      const payload = {
        id: checkUser._id,
        name: checkUser.name,
        email: checkUser.email,
        role: checkUser.role,
      };

      //create a jwt token
      const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "365d",
      });

      //return cookies for response

      //options for cookie
      const options = {
        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      console.log(jwtToken);
      return res
        .cookie("token", jwtToken, options)
        .status(200)
        .json({
          data: {
            name: checkUser.name,
            email: checkUser.email,
            role: checkUser.role,
            address: checkUser.address,
            token: jwtToken,
            tokenExpire: Date.now() + 365 * 24 * 60 * 60 * 1000,
          },
          message: "Login successful",
        });
    } else {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }
  } catch (err) {
    //catch errors
    res.send("Error while logging in" + err.message);
  }
};

//========================PLACE ORDER==========================================
export const placeOrder = async (req, res) => {
  try {
    const { order } = req.body;
    const { user } = req.body;

    //create cartItems accroding to the schema of Order.items[]
    const cartItems = order.items.map((item) => {
      return {
        shopId: new mongoose.Types.ObjectId(item.shopId),
        productId: item.id,
        quantity: item.qty,
        price: item.mrp,
      };
    });

    //create a new order=========
    const placedOrder = new Order({
      userId: user.id,
      items: cartItems,
      totalQty: order.total,
      totalAmount: order.price,
    });

    const newPlacedOrder = await placedOrder.save();

    try {
      const userId = user.id;

      const checkUser = await User.findOneAndUpdate(
        {
          _id: userId,
        },
        { $push: { orders: newPlacedOrder._id } },
        { new: true }
      )
        .populate("orders")
        .exec();
      if (!checkUser) {
        return res.status(400).json({
          success: false,
          message: "User doesn't exist, please sign in / login",
        });
      }
    } catch (err) {
      console.log("cant find user : ", err.message);
    }

    res.status(200).json({
      success: true,
      message: "Order Successful",
      data: placedOrder,
    });
  } catch (err) {
    console.log("order error : ", err.message);
    return res.status(400).json({
      success: false,
      message: "Failed to place the order",
      data: err.message,
    });
  }
};

//========================USER LOCATION=====================================
export const updateAddress = async (req, res) => {
  try {
    const { address } = req.body;
    const { id } = req.params;
    // console.log({ id, address });

    const checkUser = await User.findOneAndUpdate(
      { email: id },
      { $set: { address: address } },
      { new: true }
    );
    console.log(checkUser);
    return res.status(200).json({
      message: "Updated successfully",
      address: checkUser.address,
    });
  } catch (err) {
    console.log("err while updating address : ", err.message);
    res.status(400).json({
      success: false,
      message: "Can't update message",
    });
  }
};

//======================GET ORDERS LIST OF THE USER =========================

export const getOrders = async (req, res) => {
  try {
    const { id } = req.body.user;

    try {
      const checkUser = await Order.find({ userId: id }).populate({
        path: "items",
        populate: {
          path: "productId",
          model: "Product",
        },
      });

      const products = checkUser.map((order) => {
        return {
          id: order._id,
          image: order.items[0].productId.image,
          name: order.items.map((item) => item.productId.name),
          timeP: order.timePlaced.getTime(),
          timeD: order.timeDelivered,
          price: order.totalAmount,
        };
      });

      return res.status(200).json({
        success: true,
        data: products,
      });
    } catch (err) {
      return res.status(400).json({
        message: "Error while fetching orders : " + err.message,
      });
    }
  } catch (err) {
    console.log("err while getting orders : ");
  }
};

//==========================CANCEL ORDER ==============================

export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    console.log("deleted order : ", order);
    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Error while canceling order : " + err.message,
    });
  }
};

//==========================USER SIGNIN WITH GOOGLE========================================
export const signinWithGoogle = async (req, res) => {
  const { email, name } = req.body;
  console.log(email, name);
  try {
    const checkUser = await User.findOne({ email });
    let id;

    if (!checkUser) {
      const user = new User({
        name,
        email,
        role: "Customer",
      });

      const newUser = await user.save();
      id = newUser._id;
    } else {
      id = checkUser._id;
    }

    const payload = {
      id,
      name,
      email,
      role: "Customer",
    };

    // console.log(payload);

    try {
      const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "365d",
      });
      console.log(jwtToken);
      return res.status(200).json({
        success: true,
        data: {
          name,
          email,
          role: "Customer",
          address: checkUser?.address || null,
          token: jwtToken,
          tokenExpire: Date.now() + 365 * 24 * 60 * 60 * 1000,
        },
      });
    } catch (err) {
      console.log("Token error : " + err.message);
    }
  } catch (err) {
    console.log("Google Auth error : " + err.message);
    return res.status(400).json({
      success: false,
      message: "Google Auth error : " + err.message,
    });
  }
};
