const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  amount: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Purchase", purchaseSchema);
