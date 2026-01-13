const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const uploadRoutes = require("./routes/upload");
const chatRoutes = require("./routes/chat");
const queryRoutes = require("./routes/query");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/upload", uploadRoutes);
// app.use("/api/upload", uploadRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/query", queryRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.listen(5000, () => {
  console.log("Server running on 5000");
});
