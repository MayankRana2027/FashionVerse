import axios from "axios";
import "../style.css";

const API_BASE_URL = "http://localhost:8000";

export default function Upload({selectedFile, setSelectedFile, setPreviewUrl, setResults, loading, setLoading, setError}) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));

    setResults([]);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/recommend?k=12`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResults(response.data.results);
    } catch (err) {
      setError(
        err.response?.data?.detail ??
        "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-section">
      <label htmlFor="file-upload" className="upload-box">
        <p>
          Upload a fashion image to explore similar clothing and outfit recommendations.
        </p>

        <input
          id="file-upload"
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />

      </label>

      <button
        onClick={handleSubmit}
        disabled={!selectedFile || loading}
      >
        {loading
          ? "Finding Similar Styles..."
          : "Get Recommendations"}
      </button>
    </div>

  );
}