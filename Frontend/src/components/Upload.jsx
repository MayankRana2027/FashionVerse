import axios from "axios";
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
        `${API_BASE_URL}/recommend?k=15`, // This is where we are selecting no. of images
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
          Upload a image to explore similar clothing and styles
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
        style={{ minWidth: "220px" }} // or use a Tailwind class like `min-w-[220px]` / `w-56`
      >
        {loading ? "Finding Similar Styles..." : "Discover Similar Clothes"}
      </button>
    </div>

  );
}