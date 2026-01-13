

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // 🔍 DEBUG LINE (YAHI PE HONI CHAHIYE)
  console.log("AUTH HEADER:", req.headers.authorization);

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Unauthorized or token missing"
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token"
    });
  }
};
