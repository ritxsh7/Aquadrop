import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//========================authentication middleware======================
export const auth = (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    } else {
      return res.status(400).json({
        message: "Not a bearer token",
      });
    }

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "No token",
      });
    }

    //verify the jwt token
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);

      //add a new field user in the req body which will be receiver by the controller
      req.body.user = payload;
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    }
  } catch (err) {
    console.log("auth error : ", err.message);
    return res.status(400).json({
      success: false,
      message: "Authentication error" + err.message,
    });
  }
  //call the next middleware
  next();
};

//=====================isUser Middleware=================================
export const isUser = (req, res, next) => {
  try {
    const { user } = req.body;
    if (user.role !== "Customer") {
      return res.status(400).json({
        success: false,
        message: "User role not permitted",
      });
    }
    next();
  } catch (err) {
    console.log("error : ", err.message);
    return res.status(400).json({
      success: false,
      message: "Authentication error",
    });
  }
};

//=====================isDealer Middleware===============================
export const isDealer = (req, res, next) => {
  try {
    const { user } = req.body;
    if (user.role === "Dealer") {
      next();
    } else {
      res.status(400).json({
        success: false,
        message: "Access denied to dealer route",
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Authentication error",
    });
  }
};
