// const express = require("express");
// const gemini = require("../services/gemini");
// const auth = require("../middleware/auth");

// const router = express.Router();

// router.post("/", auth, async (req, res) => {
//   try {
//     const { question, extractedText, strictMode } = req.body;

//     // -------------------------------
//     // 🛑 STRICT MODE (Week-3 logic)
//     // -------------------------------
//     if (strictMode === true) {
//       if (!extractedText || extractedText.trim() === "") {
//         return res.json({
//           answer: "Sorry, this information is not present in the uploaded document."
//         });
//       }

//       const strictPrompt = `
// You are an AI assistant.

// Answer ONLY using the document below.
// If the answer is not found, say:
// "Sorry, this information is not present in the uploaded document."

// Document:
// ${extractedText}

// Question:
// ${question}
//       `;

//       const answer = await gemini(strictPrompt);
//       return res.json({ answer });
//     }

//     // -------------------------------
//     // 🤖 HYBRID MODE (ChatGPT-like)
//     // -------------------------------
//     const hybridPrompt = `
// You are an AI assistant.

// First, try to answer using the document.
// If the answer is not found in the document,
// then answer using your general knowledge
// and clearly mention that it is based on general knowledge.

// Document:
// ${extractedText}

// Question:
// ${question}
//     `;

//     const answer = await gemini(hybridPrompt);
//     res.json({ answer });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ answer: "Something went wrong" });
//   }
// });

// module.exports = router;



const express = require("express");
const gemini = require("../services/gemini");
const auth = require("../middleware/auth");
const Document = require("../models/Document");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const { question } = req.body;

    const doc = await Document.findOne({ userId: req.userId }).sort({ _id: -1 });

    const context = doc ? doc.text : "No PDF uploaded";

    const prompt = `
You are an AI assistant like ChatGPT.

If the question is related to the PDF, use the PDF context.
If not, answer normally using your general knowledge.

PDF Context:
${context}

Question:
${question}
`;

    const answer = await gemini(prompt);
    res.json({ answer });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "AI processing failed" });
  }
});

module.exports = router;
