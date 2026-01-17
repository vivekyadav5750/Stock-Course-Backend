const express = require("express");
const dotenv = require("dotenv");


dotenv.config();
const app = express();
const PORT = process.env.PORT || 2000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectDB = require('./src/config/db');
connectDB();

//routes imports
const authRoutes = require("./src/Routes/auth.route");
const courseRouter = require("./src/Routes/course.route");
const moduleRouter = require("./src/Routes/module.route");
const lessonRouter = require("./src/Routes/lesson.route");







//Routes
app.use("/api/auth", authRoutes);
app.use("/api/course", courseRouter);
app.use("/api/module", moduleRouter);
app.use("/api/lesson", lessonRouter);



// 3️⃣ Start server
 app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
});
  