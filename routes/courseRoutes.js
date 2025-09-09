const express = require("express");
const { createCourse, getCourses, getCourse, deleteCourse } = require("../controllers/courseController");
const { authenticateToken, authorizeAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", getCourses);
router.get("/:id", getCourse);
router.post("/", authenticateToken, authorizeAdmin, createCourse);
router.delete("/:id", authenticateToken, authorizeAdmin, deleteCourse);

module.exports = router;
