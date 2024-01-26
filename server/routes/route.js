import express from "express";

import { auth, isUser, isDealer } from "../middlewares/auth.js";

//=============imports for user==============================
import {
  cancelOrder,
  getOrders,
  signinWithGoogle,
  userSignUp,
  placeOrder,
  updateAddress,
  userLogin,
} from "../controllers/userController.js";

// =========imports for shops========================

import {
  addShop,
  getTopShops,
  getNearShops,
  getShopDetails,
  addProducts,
} from "../controllers/shopController.js";

//=============import for dealer===================-
import {
  getDealerInfo,
  signUpDealer,
} from "../controllers/sellerController.js";
import { loginDealer } from "../controllers/sellerController.js";
import {
  getThisMonthsEarnings,
  getThisMonthsOrders,
} from "../controllers/seller.dashboard.js";
import {
  getThisMonthsEarningsNumber,
  getThisMonthsOrdersNumber,
} from "../controllers/seller.dashboard.cards.js";

const router = express.Router();

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

router.post("/dealer/signup", signUpDealer);
router.post("/dealer/login", loginDealer);
router.get("/dealer/info", auth, isDealer, getDealerInfo);
router.post("/add-shop", addShop);

// ======================ROUTES FOR DEALER DASHBOARD FILTERS==================
router.get(
  "/dealer/dashboard/get-orders/:id",
  auth,
  isDealer,
  getThisMonthsOrders
);

router.get(
  "/dealer/dashboard/get-earnings/:id",
  auth,
  isDealer,
  getThisMonthsEarnings
);

router.get(
  "/dealer/dashboard/get-orders-numbers/:id",
  auth,
  isDealer,
  getThisMonthsOrdersNumber
);

router.get(
  "/dealer/dashboard/get-earnings-numbers/:id",
  auth,
  isDealer,
  getThisMonthsEarningsNumber
);

//========================PRODUCT ROUTES================================
router.get("/get-top-shops", getTopShops);
router.get("/nearbyshops", getNearShops);
router.get("/get-shop/:id", getShopDetails);
router.post("/add-product", addProducts);

export default router;
