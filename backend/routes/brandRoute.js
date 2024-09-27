const express = require("express");

const brandCtrl = require("../controller/brandCtrl");
const userCtrl = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { uploadPhoto } = require("../middlewares/uploadImage");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  brandCtrl.createBrand
);
router.post(
  "/smartBrandSearch",
  authMiddleware,
  isAdmin,
  userCtrl.smartUserSearch("brand")
);

router.put(
  "/",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  brandCtrl.updateBrand
);

router.get("/:id", brandCtrl.getBrand);
router.get("/", brandCtrl.getAllBrand);

router.delete("/:id", authMiddleware, isAdmin, brandCtrl.deleteBrand);

module.exports = router;
