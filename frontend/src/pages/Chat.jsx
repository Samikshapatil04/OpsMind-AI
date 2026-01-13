

// import { useState } from "react";
import axios from "axios";
import "./Chat.css";
import { useState, useEffect } from "react";

function TypeWriter({ text }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 0;

    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text.charAt(i));
      i++;

      if (i >= text.length) {
        clearInterval(interval);
      }
    }, 55); // typing speed

    return () => clearInterval(interval);
  }, [text]);

  return <div className="bubble bot">{displayed}</div>;
}


export default function Chat() {
  const [file, setFile] = useState(null);
  const [pdfCount, setPdfCount] = useState(0);
  const [question, setQuestion] = useState("");
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [typing, setTyping] = useState(false);

  // 🔹 Create New Chat
  const newChat = () => {
    const id = Date.now();
    const chat = { id, title: "New Chat", messages: [] };
    setChats([chat, ...chats]);
    setActiveChat(chat);
    setPdfCount(0);
  };

  // 🔹 Rename Chat
  const renameChat = (chat) => {
    const name = prompt("Rename chat", chat.title);
    if (!name) return;
    chat.title = name;
    setChats([...chats]);
  };

  // 🔹 Delete Chat
  const deleteChat = (id) => {
    if (!window.confirm("Delete this chat?")) return;
    const filtered = chats.filter((c) => c.id !== id);
    setChats(filtered);
    if (activeChat?.id === id) setActiveChat(null);
  };

  // 🔹 Upload PDF (UI limit = 3)
  const uploadPdf = async () => {
    if (!file || pdfCount >= 3) return alert("Max 3 PDFs allowed");

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("pdf", file);

    await axios.post("http://localhost:5000/upload", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setPdfCount(pdfCount + 1);
    setFile(null);
  };

  // 🔹 Ask Question
  const askQuestion = async () => {
    if (!question.trim() || !activeChat) return;

    const token = localStorage.getItem("token");

    // 🔹 Save question immediately
    const msg = { q: question, a: "" };
    activeChat.messages.push(msg);

    // 🔹 First question = chat title
    if (activeChat.messages.length === 1) {
      activeChat.title = question.slice(0, 30);
    }

    setChats([...chats]);
    setQuestion("");
    setTyping(true);

    const res = await axios.post(
      "http://localhost:5000/api/query",
      { question },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    msg.a = res.data.answer;
    setTyping(false);
    setChats([...chats]);
  };

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>OpsMind AI</h2>

        <button className="new-chat" onClick={newChat}>
          + New Chat
        </button>

        {chats.map((c) => (
          <div
            key={c.id}
            className={`chat-item ${activeChat?.id === c.id ? "active" : ""}`}
          >
            <span onClick={() => setActiveChat(c)}>{c.title}</span>

            <div className="chat-actions">
              <button onClick={() => renameChat(c)}>✏️</button>
              <button onClick={() => deleteChat(c.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </aside>

      {/* Main Chat */}
      <main className="chat-area">
        {pdfCount > 0 && (
          <div className="pdf-badge">📄 PDF Loaded ({pdfCount})</div>
        )}

        <div className="messages">
          {activeChat?.messages.map((m, i) => (
            <div key={i}>
              <div className="bubble user">{m.q}</div>
              {/* {m.a && <div className="bubble bot">{m.a}</div>} */}
              {m.a && <TypeWriter text={m.a} />}

            </div>
          ))}

          {typing && <div className="typing">AI is typing...</div>}
        </div>

        {/* Input */}
        <div className="input-bar">
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button onClick={uploadPdf}>Upload</button>

          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything..."
          />
          <button onClick={askQuestion}>Send</button>
        </div>
      </main>
    </div>
  );
}
