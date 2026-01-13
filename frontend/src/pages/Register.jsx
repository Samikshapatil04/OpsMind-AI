import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

const Register = () => {
  const navigate = useNavigate();

  // 🔹 Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 TYPEWRITER STATE
  const fullText = `Yoour intelligent assistant to chat with documents,
ask questions, and get instant insights powered by AI.`;

  const [typedText, setTypedText] = useState("");

  // 🔹 TYPEWRITER EFFECT (FIXED & SAFE)
  useEffect(() => {
    let index = 0;
    setTypedText("");

    const interval = setInterval(() => {
      setTypedText((prev) => prev + fullText.charAt(index));
      index++;

      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 79);

    return () => clearInterval(interval);
  }, []);

  // 🔹 Input change handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Register submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* LEFT HERO SECTION */}
      <div className="hero-section">
        <h1 className="brand">OpsMind AI</h1>

        <p id="typewriter" className="hero-text">
          {typedText}
        </p>

        <div className="hero-tags">
          <span>🤖 AI Chat</span>
          <span>📄 PDF Intelligence</span>
          <span>⚡ Fast Answers</span>
          <span>🔐 Secure</span>
        </div>
      </div>

      {/* RIGHT REGISTER CARD */}
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="subtitle">Start chatting with AI</p>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="switch-auth">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
