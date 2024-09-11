const express = require("express");

const authCtrl = require("../controller/authCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", authCtrl.signup);
router.post("/loginAdmin", authCtrl.login("admin"));
router.post("/login", authCtrl.login("user"));
router.post("/forgotPassword", authCtrl.forgotPassword);

router.patch("/resetPassword/:token", authCtrl.resetPassword);
router.patch("/password", authMiddleware, authCtrl.updatePassword);

router.get("/refresh", authMiddleware, authCtrl.handleRefreshToken);
router.get("/logout", authMiddleware, authCtrl.logout);

module.exports = router;
