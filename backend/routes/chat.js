// backend/routes/chat.js

const express = require("express");
const Chat = require("../models/Chat");
const Message = require("../models/Message");
const auth = require("../middleware/auth");

const router = express.Router();


// 🔹 Create new chat
router.post("/create", auth, async (req, res) => {
  const chat = await Chat.create({
    userId: req.userId,
    title: req.body.title || "New Chat"
  });

  res.json(chat);
});


// 🔹 Get all chats of user
router.get("/", auth, async (req, res) => {
  const chats = await Chat.find({ userId: req.userId })
    .sort({ updatedAt: -1 });

  res.json(chats);
});


// 🔹 Get messages of a chat
router.get("/:chatId", auth, async (req, res) => {
  const messages = await Message.find({
    chatId: req.params.chatId
  }).sort({ createdAt: 1 });

  res.json(messages);
});


// 🔹 Delete chat + messages
router.delete("/:chatId", auth, async (req, res) => {
  await Message.deleteMany({ chatId: req.params.chatId });
  await Chat.findByIdAndDelete(req.params.chatId);

  res.json({ message: "Chat deleted" });
});

module.exports = router;
