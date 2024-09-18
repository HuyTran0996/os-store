const express = require("express");

const userCtrl = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/allUsers", authMiddleware, isAdmin, userCtrl.getAllUser);
router.get("/wishlist", authMiddleware, userCtrl.getWishlist);
router.get(
  "/userTotalCompare",
  authMiddleware,
  isAdmin,
  userCtrl.userProductOrderCompare
);
router.get("/:id", authMiddleware, userCtrl.getAUser);

router.put("/editUser", authMiddleware, userCtrl.updatedUser);
router.put("/saveAddress", authMiddleware, userCtrl.saveAddress);
router.put("/blockUser/:id", authMiddleware, isAdmin, userCtrl.blockUser);
router.put("/unblockUser/:id", authMiddleware, isAdmin, userCtrl.unblockUser);

router.delete("/:id", userCtrl.deleteAUser);

module.exports = router;
