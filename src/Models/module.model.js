const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    order: {
      type: Number,
      required: true, // module sequence
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Module", moduleSchema);
