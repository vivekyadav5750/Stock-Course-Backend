const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({

    title: { type: String, required: true, trim: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    level: {type: String, required: true, enum: ["Beginner", "Intermediate", "Advanced"]},
    price: {type: Number, required: true},
    thumbnail: {type: String}, 
    isPublished: {type: Boolean, default: false},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}

}, {timestamps: true});


module.exports = mongoose.model("Course" ,courseSchema);