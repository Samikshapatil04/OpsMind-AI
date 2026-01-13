const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  text: String,
}, { timestamps: true });

module.exports = mongoose.model("Document", documentSchema);
