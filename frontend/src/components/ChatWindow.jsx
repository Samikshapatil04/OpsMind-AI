import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import MessageBubble from "./MessageBubble";
import UploadModal from "./UploadModal";

export default function ChatWindow() {
  const { token } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [extractedText, setExtractedText] = useState("");

  const ask = async () => {
    setMessages([...messages, { role: "user", text: question }]);

    const res = await axios.post(
      "http://localhost:5000/api/query",
      { question, extractedText },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-role": "user"
        }
      }
    );

    setMessages(m => [...m, { role: "assistant", text: res.data.answer }]);
    setQuestion("");
  };

  return (
    <div style={{ flex: 1, padding: "20px" }}>
      {messages.map((m, i) => (
        <MessageBubble key={i} role={m.role} text={m.text} />
      ))}

      <UploadModal setExtractedText={setExtractedText} />

      <div style={{ display: "flex" }}>
        <input
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="Ask something..."
          style={{ flex: 1 }}
        />
        <button onClick={ask}>Send</button>
      </div>
    </div>
  );
}
