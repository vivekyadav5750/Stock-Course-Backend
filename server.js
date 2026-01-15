const express = require("express");
const dotenv = require("dotenv");


dotenv.config();
const app = express();
const PORT = process.env.PORT || 2000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectDB = require('./src/config/db');
connectDB();

//routes

const authRoutes = require("./src/Routes/auth.route");
app.use("/api/auth", authRoutes)



// 3️⃣ Start server
 app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
});
  