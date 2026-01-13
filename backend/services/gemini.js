
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function askGemini(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // ✅ SIMPLE STRING ONLY
    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    console.error("GEMINI ERROR:", error.message);
    throw error;
  }
}

module.exports = askGemini;
