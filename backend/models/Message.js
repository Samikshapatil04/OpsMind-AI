const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  chatId: mongoose.Schema.Types.ObjectId,
  role: String, // user | assistant
  content: String,
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);
