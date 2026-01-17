const express = require("express");
const router = express.Router();

const {
  createLesson,
  updateLesson,
  deleteLesson,
  getLessonsByModule,
  getLessonById,
} = require("../Controllers/lesson.controller");

const { protect } = require("../Middleware/auth.middleware");
const { allowRoles } = require("../Middleware/role.middleware");

// ADMIN
router.post("/", protect, allowRoles("admin"), createLesson);
router.put("/:id", protect, allowRoles("admin"), updateLesson);
router.delete("/:id", protect, allowRoles("admin"), deleteLesson);

// STUDENT
router.get("/module/:moduleId", protect, getLessonsByModule);
router.get("/:id", protect, getLessonById);

module.exports = router;
