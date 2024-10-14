const express = require("express");

const couponCtrl = require("../controller/couponCtrl");
const {
  authMiddleware,
  isAdmin,
  isManager,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, isAdmin, couponCtrl.createCoupon);

router.put("/blockCoupon/:id", authMiddleware, isAdmin, couponCtrl.blockCoupon);
router.put(
  "/unblockCoupon/:id",
  authMiddleware,
  isAdmin,
  couponCtrl.unblockCoupon
);
router.put("/:id", authMiddleware, isAdmin, couponCtrl.updateCoupon);

router.get("/:id", authMiddleware, isAdmin, couponCtrl.getCoupon);
router.get("/", authMiddleware, isAdmin, couponCtrl.getAllCoupons);

router.delete("/:id", authMiddleware, isManager, couponCtrl.deleteCoupon);

module.exports = router;
