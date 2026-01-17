const Lesson = require("../Models/lesson.model");
const Enrollment = require("../Models/enrollment.model");

/**
 * ADMIN: CREATE LESSON
 */
exports.createLesson = async (req, res) => {
  try {
    const lesson = await Lesson.create(req.body);
    res.status(201).json(lesson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * ADMIN: UPDATE LESSON
 */
exports.updateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.json(lesson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * ADMIN: DELETE LESSON
 */
exports.deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.json({ message: "Lesson deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * STUDENT: GET LESSONS BY MODULE
 */
exports.getLessonsByModule = async (req, res) => {
  const lessons = await Lesson.find({
    module: req.params.moduleId,
  }).sort("order");

  res.json(lessons);
};

/**
 * STUDENT: ACCESS SINGLE LESSON
 */
exports.getLessonById = async (req, res) => {
  const lesson = await Lesson.findById(req.params.id);

  if (!lesson) {
    return res.status(404).json({ message: "Lesson not found" });
  }

  // preview allowed
  if (lesson.isPreview) {
    return res.json(lesson);
  }

  // check enrollment
  const enrolled = await Enrollment.findOne({
    student: req.user._id,
    course: lesson.course,
  });

  if (!enrolled) {
    return res.status(403).json({
      message: "Please purchase course to access this lesson",
    });
  }

  res.json(lesson);
};
