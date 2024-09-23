const express = require("express");

const productCtrl = require("../controller/productCtrl");
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

router.get("/", authMiddleware, isAdmin, productCtrl.getAllProduct);
router.get("/:id", productCtrl.getAProduct);

router.put("/wishlist", authMiddleware, productCtrl.toggleWishlist);
router.put("/rating", authMiddleware, productCtrl.rating);
router.put("/addVariant", authMiddleware, productCtrl.addVariant);
// router.put(
//   "/upload/:id",
//   authMiddleware,
//   isAdmin,
//   uploadPhoto.array("images", 10),
//   productCtrl.uploadImages
// );
router.put(
  "/upload/:id",

  uploadPhoto.array("images", 10),
  productCtrl.uploadImages
);
router.put("/:id", authMiddleware, isAdmin, productCtrl.updateProduct);

router.delete("/deleteImg", authMiddleware, isAdmin, productCtrl.deleteImages);
router.delete("/:id", authMiddleware, isAdmin, productCtrl.deleteProduct);

module.exports = router;
