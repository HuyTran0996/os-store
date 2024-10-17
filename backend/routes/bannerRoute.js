const express = require("express");

const bannerCtrl = require("../controller/bannerCtrl");
const userCtrl = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { uploadPhoto } = require("../middlewares/uploadImage");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  bannerCtrl.createBanner
);
router.post(
  "/smartBannerSearch",
  authMiddleware,
  isAdmin,
  userCtrl.smartUserSearch("banner")
);

router.put(
  "/",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  bannerCtrl.updateBanner
);

router.get("/", bannerCtrl.getAllBanner);

router.delete("/:id", authMiddleware, isAdmin, bannerCtrl.deleteBanner);

module.exports = router;
