const express = require("express");
const multer = require("multer");
const pdf = require("pdf-parse");
const Document = require("../models/Document");
const auth = require("../middleware/auth");

const upload = multer();
const router = express.Router();

router.post("/", auth, upload.single("pdf"), async (req, res) => {
  const data = await pdf(req.file.buffer);
  await Document.create({ userId: req.userId, text: data.text });
  res.json({ extractedText: data.text });
});

module.exports = router;
