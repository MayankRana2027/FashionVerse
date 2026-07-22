import { useState } from "react";
import "./style.css";
import Upload from "./components/Upload";
import Content from "./components/Content";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div className="app">
      <header className="hero">
        <h1 className="logo">FashionVerse</h1>
      </header>

      <Upload
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        previewUrl={previewUrl}
        setPreviewUrl={setPreviewUrl}
        results={results}
        setResults={setResults}
        loading={loading}
        setLoading={setLoading}
        error={error}
        setError={setError}
      />

      <Content
        previewUrl={previewUrl}
        results={results}
      />
    </div>
  );
}

export default App;