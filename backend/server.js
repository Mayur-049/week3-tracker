require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/Userroutes");
const resourceRoutes = require("./routes/Resourceroutes");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send("API is running...");
});

app.use("/api/User", userRoutes);
app.use("/api/Resource", resourceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
