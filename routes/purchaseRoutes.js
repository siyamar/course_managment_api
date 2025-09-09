const express = require("express");
const { buyCourse, myPurchases } = require("../controllers/purchaseController");
const { authenticateToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authenticateToken, buyCourse);
router.get("/", authenticateToken, myPurchases);

module.exports = router;
