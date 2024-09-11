const express = require("express");

const blogCtrl = require("../controller/blogCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { uploadPhoto } = require("../middlewares/uploadImage");

const router = express.Router();

router.post("/", authMiddleware, isAdmin, blogCtrl.createBlog);

router.put("/likes", authMiddleware, blogCtrl.toggleLikeDislike("like"));
router.put("/dislikes", authMiddleware, blogCtrl.toggleLikeDislike("dislike"));
router.put(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  blogCtrl.uploadImages
);
router.put("/:id", authMiddleware, isAdmin, blogCtrl.updateBlog);

router.get("/:id", blogCtrl.getBlog);
router.get("/", blogCtrl.getAllBlog);

router.delete("/deleteImg", authMiddleware, isAdmin, blogCtrl.deleteImages);
router.delete("/:id", authMiddleware, isAdmin, blogCtrl.deleteBlog);

module.exports = router;
