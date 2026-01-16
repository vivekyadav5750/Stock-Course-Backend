const Course = require("../Models/Course");

/**
 * ADMIN: CREATE COURSE
 * POST /api/courses
 */
exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * ADMIN: UPDATE COURSE
 * PUT /api/courses/:id
 */
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({
      message: "Course updated successfully",
      course,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * ADMIN: DELETE COURSE
 * DELETE /api/courses/:id
 */
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * ADMIN: PUBLISH / UNPUBLISH COURSE
 * PATCH /api/courses/:id/publish
 */
exports.togglePublish = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.isPublished = !course.isPublished;
    await course.save();

    res.json({
      message: `Course ${
        course.isPublished ? "published" : "unpublished"
      } successfully`,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * STUDENT: GET ALL PUBLISHED COURSES
 * GET /api/courses
 */
exports.getPublishedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).select(
      "-createdBy"
    );

    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * STUDENT: GET SINGLE COURSE DETAILS
 * GET /api/courses/:id
 */
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findOne({
      _id: req.params.id,
      isPublished: true,
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    res.status(400).json({ error: "Invalid course ID" });
  }
};
