const express = require("express");

const categoryCtrl = require("../controller/prodcategoryCtrl");
const userCtrl = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { uploadPhoto } = require("../middlewares/uploadImage");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  categoryCtrl.createCategory
);
router.post(
  "/smartCategorySearch",
  authMiddleware,
  isAdmin,
  userCtrl.smartUserSearch("prodCategory")
);

router.put(
  "/",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  categoryCtrl.updateCategory
);

router.get("/:id", categoryCtrl.getCategory);
router.get("/", categoryCtrl.getAllCategory);

router.delete("/:id", authMiddleware, isAdmin, categoryCtrl.deleteCategory);

module.exports = router;
