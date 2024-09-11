const express = require("express");

const brandCtrl = require("../controller/brandCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, isAdmin, brandCtrl.createBrand);

router.put("/:id", authMiddleware, isAdmin, brandCtrl.updateBrand);

router.get("/:id", brandCtrl.getBrand);
router.get("/", brandCtrl.getallBrand);

router.delete("/:id", authMiddleware, isAdmin, brandCtrl.deleteBrand);

module.exports = router;
