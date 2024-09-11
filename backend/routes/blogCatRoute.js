const express = require("express");

const blogCatCtrl = require("../controller/blogCatCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, isAdmin, blogCatCtrl.createCategory);

router.put("/:id", authMiddleware, isAdmin, blogCatCtrl.updateCategory);

router.get("/:id", blogCatCtrl.getCategory);
router.get("/", blogCatCtrl.getallCategory);

router.delete("/:id", authMiddleware, isAdmin, blogCatCtrl.deleteCategory);

module.exports = router;
