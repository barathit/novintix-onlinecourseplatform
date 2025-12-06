const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  title: String,
  videoUrl: String,
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  lessons: [lessonSchema],
});

module.exports = mongoose.model("Course", courseSchema);
