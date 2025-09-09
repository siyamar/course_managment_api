const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");
users = require("./routes/authRoutes");
course = require("./routes/courseRoutes");
purchase = require("./routes/purchaseRoutes")

require("dotenv").config();

const app = express();
connectDB();
app.use(express.json());

// Routes
app.use("/api/auth", users);
app.use("/api/courses", course);
app.use("/api/purchases", purchase);

app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running at http://localhost:${process.env.PORT}`)
);
