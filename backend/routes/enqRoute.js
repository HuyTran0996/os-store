const express = require("express");

const enquiryCtrl = require("../controller/enqCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", enquiryCtrl.createEnquiry);

router.put("/:id", authMiddleware, isAdmin, enquiryCtrl.updateEnquiry);

router.get("/:id", enquiryCtrl.getEnquiry);
router.get("/", enquiryCtrl.getallEnquiry);

router.delete("/:id", authMiddleware, isAdmin, enquiryCtrl.deleteEnquiry);

module.exports = router;
