const Course = require("../models/Course");

// ---------------create course (Admin only)-----------------------
exports.createCourse = async (req, res) => {
  const { title, description, price, instructor } = req.body;
  // Validation
  if (!title || !description || !price) {
    return res.status(400).json({
      status: "Failed",
      message: "All fields are required"
    });
  }
  
  // Check duplicate course based on title
  const existingCourse = await Course.findOne({ title });
    if (existingCourse) {
      return res.status(400).json({
        status: "Failed",
        message: "A course with this title already exists"
      });
    }
  const course = new Course({ title, description, price, instructor });
  await course.save();

  res.json({
    status: "Success",
    message: "Course created successfully",
    data: course
  });
};

// ---------------- Get All Courses ----------------
exports.getCourses = async (req, res) => {
  const courses = await Course.find();
  res.json({
      status: "Success",
      count: courses.length,
      data: courses
    });
};

// ---------------- Get Single Course ----------------
exports.getCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.json({
      status: "Success",
      count: course.length,
      data: course
    });
};

exports.deleteCourse = async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ 
    status: "Success",
    message: "Course deleted" 
  });
};
