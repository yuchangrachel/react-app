const express = require("express");
//configure .env file
const dotenv = require("dotenv");

const connectDB = require("./data/configDB.js");
const userRoutes = require("./routes/userRoutes");
const diaryRoutes = require("./routes/diaryRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
dotenv.config();
connectDB();
//accept json data
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running ...");
});

//use middleware and routes
app.use("/api/users", userRoutes);
app.use("/api/diaries", diaryRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server starts on PORT ${PORT}`));
