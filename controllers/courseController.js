const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.json(course);
};

exports.getCourses = async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
};

exports.getCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.json(course);
};

exports.deleteCourse = async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ message: "Course deleted" });
};
