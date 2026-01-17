const Module = require("../Models/module.model");

/**
 * ADMIN: CREATE MODULE
 */
exports.createModule = async (req, res) => {
  try {
    const module = await Module.create(req.body);
    res.status(201).json(module);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * ADMIN: UPDATE MODULE
 */
exports.updateModule = async (req, res) => {
  try {
    const module = await Module.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }

    res.json(module);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * ADMIN: DELETE MODULE
 */
exports.deleteModule = async (req, res) => {
  try {
    const module = await Module.findByIdAndDelete(req.params.id);

    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }

    res.json({ message: "Module deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * STUDENT: GET MODULES BY COURSE
 */
exports.getModulesByCourse = async (req, res) => {
  const modules = await Module.find({
    course: req.params.courseId,
  }).sort("order");

  res.json(modules);
};
