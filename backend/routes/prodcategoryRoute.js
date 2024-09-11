const express = require("express");

const categoryCtrl = require("../controller/prodcategoryCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, isAdmin, categoryCtrl.createCategory);

router.put("/:id", authMiddleware, isAdmin, categoryCtrl.updateCategory);

router.get("/:id", categoryCtrl.getCategory);
router.get("/", categoryCtrl.getallCategory);

router.delete("/:id", authMiddleware, isAdmin, categoryCtrl.deleteCategory);

module.exports = router;
