import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function UploadModal({ setExtractedText }) {
  const { token } = useContext(AuthContext);
  const [file, setFile] = useState(null);

  const upload = async () => {
    const fd = new FormData();
    fd.append("pdf", file);

    const res = await axios.post("http://localhost:5000/upload", fd, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setExtractedText(res.data.extractedText);
    alert("PDF uploaded");
  };

  return (
    <div style={{ margin: "15px 0" }}>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={upload}>Upload PDF</button>
    </div>
  );
}
