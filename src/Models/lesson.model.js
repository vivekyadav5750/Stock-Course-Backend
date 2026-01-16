const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    contentType: {
      type: String,
      enum: ["video", "pdf", "text"],
      required: true,
    },

    videoUrl: {
      type: String,
    },

    pdfUrl: {
      type: String,
    },

    textContent: {
      type: String,
    },

    duration: {
      type: Number, // minutes (for video)
    },

    order: {
      type: Number,
      required: true, // lesson order inside module
    },

    isPreview: {
      type: Boolean,
      default: false, // free preview lesson
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lesson", lessonSchema);
