const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String},
  price: { type: Number, required: true },
  instructor: { type: String}
});

module.exports = mongoose.model("Course", courseSchema);
