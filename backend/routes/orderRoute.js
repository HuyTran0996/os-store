const express = require("express");

const orderCtrl = require("../controller/orderCtrl");
const userCtrl = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { uploadPhoto } = require("../middlewares/uploadImage");

const router = express.Router();

router.post("/cart", authMiddleware, orderCtrl.userAddToCart);
router.post("/cart/applyCoupon", authMiddleware, orderCtrl.applyCoupon);
router.post("/cart/cashOrder", authMiddleware, orderCtrl.createOrder);
router.post("/smartOrderSearch", userCtrl.smartUserSearch("orders"));

router.get("/cart", authMiddleware, orderCtrl.getUserCart);
router.get(
  "/getOrder",
  authMiddleware,
  orderCtrl.getOrderByUserId("selfCheck")
);
router.get("/getAllOrder", authMiddleware, isAdmin, orderCtrl.getAllOrders);
router.get(
  "/getMonthlyOrders",
  authMiddleware,
  isAdmin,
  orderCtrl.getMonthlyOrders
);
router.get(
  "/getOrderByUser/:id",
  authMiddleware,
  isAdmin,
  orderCtrl.getOrderByUserId("userID")
);

router.put(
  "/updateOrder/:id",
  authMiddleware,
  isAdmin,
  orderCtrl.updateOrderStatus
);

router.delete("/emptyCart", authMiddleware, orderCtrl.emptyCart);

module.exports = router;
