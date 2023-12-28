import express from "express";
import {
  cancelOrder,
  getOrders,
  signinWithGoogle,
  userSignUp,
} from "../controllers/userController.js";
import { userLogin } from "../controllers/userController.js";
import { auth, isUser, isDealer } from "../middlewares/auth.js";
import { placeOrder } from "../controllers/userController.js";
import { updateAddress } from "../controllers/userController.js";

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
router.post("/user/order/:id", auth, isUser, placeOrder);
router.post("/user/update-address/:id", auth, isUser, updateAddress);
router.get("/user/get-orders/:id", auth, isUser, getOrders);
router.delete("/user/order/:id", auth, isUser, cancelOrder);
router.post("/user/google-auth/", signinWithGoogle);

//===========================ROUTES FOR DEALER=========================

router.post("/dealer/signup", userSignUp);
router.post("/add-shop", addShop);

//========================PRODUCT ROUTES================================
router.get("/get-top-shops", getTopShops);
router.get("/nearbyshops", getNearShops);
router.get("/get-shop/:id", getShopDetails);
router.post("/add-product", addProducts);

export default router;
