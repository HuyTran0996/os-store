const express = require("express");

const enquiryCtrl = require("../controller/enqCtrl");
const userCtrl = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", enquiryCtrl.createEnquiry);
router.post("/smartEnquirySearch", userCtrl.smartUserSearch("enquiries"));

router.put("/:id", authMiddleware, isAdmin, enquiryCtrl.updateEnquiry);

router.get("/", authMiddleware, isAdmin, enquiryCtrl.getAllEnquiry);
router.get("/:id", authMiddleware, isAdmin, enquiryCtrl.getEnquiry);

router.delete("/:id", authMiddleware, isAdmin, enquiryCtrl.deleteEnquiry);

module.exports = router;
