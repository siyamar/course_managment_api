const Purchase = require("../models/Purchase");

exports.buyCourse = async (req, res) => {
  const { courseId, amount } = req.body;
  const purchase = new Purchase({ userId: req.user.id, courseId, amount });
  await purchase.save();
  res.json({ message: "Course purchased", purchase });
};

exports.myPurchases = async (req, res) => {
  const purchases = await Purchase.find({ userId: req.user.id }).populate("courseId");
  res.json(purchases);
};
