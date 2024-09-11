const express = require("express");

const couponCtrl = require("../controller/couponCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, isAdmin, couponCtrl.createCoupon);

router.put("/:id", authMiddleware, isAdmin, couponCtrl.updateCoupon);

router.get("/:id", authMiddleware, isAdmin, couponCtrl.getCoupon);
router.get("/", authMiddleware, isAdmin, couponCtrl.getAllCoupons);

router.delete("/:id", authMiddleware, isAdmin, couponCtrl.deleteCoupon);

module.exports = router;
