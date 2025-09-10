const Purchase = require("../models/Purchase");

exports.buyCourse = async (req, res) => {
  const { courseId, amount } = req.body;
  // Check duplicate course
  const existingCourse = await Purchase.findOne({
    userId: req.user.id,
    courseId: courseId
  });
  if (existingCourse) {
    return res.json({
      message: "Already purchased",
      course: existingCourse
    });
  }

  const purchase = new Purchase({ userId: req.user.id, courseId, amount });
  await purchase.save();
  res.json({status: "Success", message: "Course purchased", purchase });
};

exports.myPurchases = async (req, res) => {
  const purchases = await Purchase.find({ userId: req.user.id }).populate("courseId");
  res.json(purchases);
};
