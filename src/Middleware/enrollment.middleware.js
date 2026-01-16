const Enrollment = require("../Models/enrollment.model");

exports.checkEnrollment = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;

    const enrolled = await Enrollment.findOne({
      student: req.user._id,
      course: courseId,
    });

    if (!enrolled) {
      return res
        .status(403)
        .json({ message: "Please purchase the course to access content" });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
