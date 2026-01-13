const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: String,
}, { timestamps: true });

module.exports = mongoose.model("Chat", chatSchema);
