const express = require("express");
const router = express.Router();

const {
  createModule,
  updateModule,
  deleteModule,
  getModulesByCourse,
} = require("../Controllers/module.controller");

const { protect } = require("../Middleware/auth.middleware");
const { allowRoles } = require("../Middleware/role.middleware");

// ADMIN
router.post("/", protect, allowRoles("admin"), createModule);
router.put("/:id", protect, allowRoles("admin"), updateModule);
router.delete("/:id", protect, allowRoles("admin"), deleteModule);

// STUDENT
router.get("/course/:courseId", protect, getModulesByCourse);

module.exports = router;
