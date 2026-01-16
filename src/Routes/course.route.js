const express = require("express");
const router = express.Router();

const {
  createCourse,
  updateCourse,
  deleteCourse,
  togglePublish,
  getPublishedCourses,
  getCourseById,
} = require("../Controllers/course.controller");

const { protect } = require("../Middleware/auth.middleware");
const { allowRoles } = require("../Middleware/role.middleware");

/* ================= ADMIN ROUTES ================= */

// Create course
router.post("/", protect, allowRoles("admin"), createCourse);

// Update course
router.put("/:id", protect, allowRoles("admin"), updateCourse);

// Delete course
router.delete("/:id", protect, allowRoles("admin"), deleteCourse);

// Publish / Unpublish
router.patch("/:id/publish", protect, allowRoles("admin"), togglePublish);

/* ================= STUDENT ROUTES ================= */

// Public course list
router.get("/", getPublishedCourses);

// Public course detail
router.get("/:id", getCourseById);

module.exports = router;
