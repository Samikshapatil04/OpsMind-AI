// backend/services/embeddings.js

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

async function getEmbedding(text) {
  // Simple lightweight embedding (simulation for academic project)
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .split(" ")
    .slice(0, 50);

  // Convert text → numeric vector (deterministic)
  const vector = words.map(word => {
    let sum = 0;
    for (let char of word) {
      sum += char.charCodeAt(0);
    }
    return sum / 100;
  });

  return vector;
}

module.exports = { getEmbedding };
