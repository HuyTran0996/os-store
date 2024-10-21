const express = require("express");

const productCtrl = require("../controller/productCtrl");
const userCtrl = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { uploadPhoto } = require("../middlewares/uploadImage");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  productCtrl.createProduct
);
router.post(
  "/addVariant/:prodId",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  productCtrl.addVariant
);
router.post("/smartProductSearch", userCtrl.smartUserSearch("product"));
router.post("/rating", authMiddleware, productCtrl.rating);

router.get("/", productCtrl.getAllProduct);
router.get("/:id", productCtrl.getAProduct);

router.put("/wishlist", authMiddleware, productCtrl.toggleWishlist);

router.put(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  productCtrl.uploadImages
);

router.put(
  "/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  productCtrl.updateProduct
);

router.delete(
  "/deleteImg",
  authMiddleware,
  isAdmin,
  productCtrl.deleteImages("productImg")
);
router.delete(
  "/deleteProductVariant",
  authMiddleware,
  isAdmin,
  productCtrl.deleteImages("productVariant")
);
router.delete("/:id", authMiddleware, isAdmin, productCtrl.deleteProduct);

module.exports = router;
