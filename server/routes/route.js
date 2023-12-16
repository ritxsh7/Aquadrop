import express from "express";
import { userSignUp } from "../controllers/userController.js";
import { userLogin } from "../controllers/userController.js";
import { auth, isUser, isDealer } from "../middlewares/auth.js";

import {
  addShop,
  getTopShops,
  getNearShops,
  getShopDetails,
  addProducts,
} from "../controllers/shopController.js";

const router = express.Router();

//=======================MAIN ROUTE====================================
// router.get("/", auth, userLogin);

//====================AUTHENTICATION ROUTES=============================
router.post("/user/signup", userSignUp);
router.post("/user/login", userLogin);

//========================ROUTES FOR CUSTOMER==========================
router.get("/user", auth, isUser, (req, res) => {
  res.json({
    success: true,
    message: "This is user route",
  });
});

//===========================ROUTES FOR DEALER=========================
router.get("/dealer", auth, isDealer, (req, res) => {
  res.json({
    success: true,
    message: "This is dealer route",
  });
});

router.post("/dealer/signup", userSignUp);
router.post("/add-shop", addShop);

//========================PRODUCT ROUTES================================
router.get("/get-top-shops", getTopShops);
router.get("/nearbyshops", getNearShops);
router.get("/get-shop/:id", getShopDetails);
router.post("/add-product", addProducts);

export default router;
