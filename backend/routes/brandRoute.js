const express = require("express");

const brandCtrl = require("../controller/brandCtrl");
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

router.put("/:id", authMiddleware, isAdmin, brandCtrl.updateBrand);

router.get("/:id", brandCtrl.getBrand);
router.get("/", brandCtrl.getAllBrand);

router.delete("/:id", authMiddleware, isAdmin, brandCtrl.deleteBrand);

module.exports = router;
