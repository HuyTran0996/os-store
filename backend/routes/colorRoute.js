const express = require("express");

const colorCtrl = require("../controller/colorCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, isAdmin, colorCtrl.createColor);

router.put("/:id", authMiddleware, isAdmin, colorCtrl.updateColor);

router.get("/:id", colorCtrl.getColor);
router.get("/", colorCtrl.getAllColor);

router.delete("/:id", authMiddleware, isAdmin, colorCtrl.deleteColor);

module.exports = router;
