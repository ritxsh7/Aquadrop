import express from "express";
import { upload } from "../configs/multer.js";

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
  SubscribeToSNS,
} from "../controllers/userController.js";

// =========imports for shops========================
import {
  addShop,
  getTopShops,
  getNearShops,
  getShopDetails,
  uploadImages,
} from "../controllers/shopController.js";

//=============import for dealer===================-
import { getAwsLocation } from "../controllers/shopController.js";
import {
  getDealerInfo,
  signUpDealer,
} from "../controllers/sellerController.js";
import { loginDealer } from "../controllers/sellerController.js";

import {
  approveOrder,
  getAllOrders,
  getThisMonthsEarnings,
  getThisMonthsOrders,
} from "../controllers/seller.dashboard.js";

import {
  getThisMonthsCustomer,
  getThisMonthsEarningsNumber,
  getThisMonthsOrdersNumber,
} from "../controllers/seller.dashboard.cards.js";
import { ValidateRegistration } from "../middlewares/validation.js";
import { registrationSchema } from "../configs/validation-schema.js";
import {
  AddProduct,
  DeleteSelectedProducts,
  GetAllProducts,
  SearchQuery,
} from "../controllers/shop.products.js";
import { PublishMessage } from "../aws/sns.js";

const router = express.Router();

//====================AUTHENTICATION ROUTES=============================
router.post("/user/signup", userSignUp);
router.post("/user/login", userLogin);
router.post("/sms", PublishMessage);
router.post("/subscribe", SubscribeToSNS);

//========================ROUTES FOR CUSTOMER==========================
router.post("/user/order/:id", auth, isUser, placeOrder);
router.post("/user/update-address/:id", auth, isUser, updateAddress);
router.get("/user/get-orders/:id", auth, isUser, getOrders);
router.delete("/user/order/:id", auth, isUser, cancelOrder);
router.post("/user/google-auth/", signinWithGoogle);

//===========================ROUTES FOR DEALER=========================

router.post(
  "/dealer/signup",
  registrationSchema,
  ValidateRegistration,
  signUpDealer
);
router.post("/dealer/login", loginDealer);
router.get("/dealer/info", auth, isDealer, getDealerInfo);
router.post("/dealer/get-aws-location", auth, isDealer, getAwsLocation);
router.post("/dealer/register-shop", auth, isDealer, addShop);

router.post(
  "/dealer/shop/upload-img",
  auth,
  isDealer,
  upload.single("img"),
  uploadImages
);

// ======================ROUTES FOR DEALER DASHBOARD FILTERS==================
router.get("/dealer/dashboard/get-orders", auth, isDealer, getThisMonthsOrders);

router.get("/dealer/get-all-orders", auth, isDealer, getAllOrders);

router.put("/dealer/approve-order/:id", auth, isDealer, approveOrder);

router.get(
  "/dealer/dashboard/get-earnings",
  auth,
  isDealer,
  getThisMonthsEarnings
);

router.get(
  "/dealer/dashboard/get-orders-numbers",
  auth,
  isDealer,
  getThisMonthsOrdersNumber
);

router.get(
  "/dealer/dashboard/get-earnings-numbers",
  auth,
  isDealer,
  getThisMonthsEarningsNumber
);

router.get(
  "/dealer/dashboard/get-customers-number",
  auth,
  isDealer,
  getThisMonthsCustomer
);

router.get(
  '/"/dealer/dashboard/get-products-number',
  auth,
  isDealer,
  getThisMonthsCustomer
);

// ==============================DEALER PRODUCT ROUTES=================================
router.post(
  "/dealer/inventory/add-products",
  auth,
  isDealer,
  upload.single("product-img"),
  AddProduct
);

router.get(
  "/dealer/inventory/get-all-products",
  auth,
  isDealer,
  GetAllProducts
);

router.delete(
  "/dealer/inventory/delete-selected-products",
  auth,
  isDealer,
  DeleteSelectedProducts
);

router.get("/dealer/inventory/search-product", auth, isDealer, SearchQuery);

//========================USER SHOP ROUTES================================
router.get("/get-top-shops", getTopShops);
router.get("/nearbyshops", getNearShops);
router.get("/get-shop/:id", getShopDetails);
export default router;
