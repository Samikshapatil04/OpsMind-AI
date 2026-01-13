import History from "./History";

export default function Sidebar() {
  return (
    <div style={{
      width: "260px",
      background: "#202123",
      padding: "15px"
    }}>
      <h3>OpsMind AI</h3>
      <button style={{ width: "100%" }}>+ New Chat</button>
      <History />
    </div>
  );
}
