export default function MessageBubble({ role, text }) {
    return (
      <div style={{
        background: role === "user" ? "#2f2f2f" : "#444654",
        padding: "12px",
        borderRadius: "8px",
        marginBottom: "10px"
      }}>
        <strong>{role === "user" ? "You" : "AI"}:</strong>
        <p>{text}</p>
      </div>
    );
  }
  