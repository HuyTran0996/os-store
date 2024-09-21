const express = require("express");

const userCtrl = require("../controller/userCtrl");
const {
  authMiddleware,
  isAdmin,
  isManager,
} = require("../middlewares/authMiddleware");

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

router.put("/editUser", authMiddleware, isAdmin, userCtrl.updatedUser("admin"));
router.put("/editUserSelf", authMiddleware, userCtrl.updatedUser("self"));
router.put("/changeRole", authMiddleware, isAdmin, userCtrl.changeRole);
router.put("/saveAddress", authMiddleware, userCtrl.saveAddress);
router.put(
  "/blockUser/:id",
  authMiddleware,
  isAdmin,
  userCtrl.blockUser("admin")
);
router.put("/blockUserSelf/:id", authMiddleware, userCtrl.blockUser("self"));
router.put("/unblockUser/:id", authMiddleware, isAdmin, userCtrl.unblockUser);

router.delete("/:id", authMiddleware, isManager, userCtrl.deleteAUser);

module.exports = router;
