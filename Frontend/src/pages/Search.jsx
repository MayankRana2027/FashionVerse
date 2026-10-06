import Upload from "../components/Upload";
import Content from "../components/Content";
import { useState } from "react";

export default function Search() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const title = "FashionVerse";

  return (
    <>
      <header className="hero">
        <h1 className="logo">
          {title.split("").map((letter, index) => (
            <span
              key={index}
              className="letter"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {letter}
            </span>
          ))}
        </h1>
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

      <Content previewUrl={previewUrl} results={results} />
    </>
  );
}