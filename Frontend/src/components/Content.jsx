const API_BASE_URL = "http://localhost:8000";

export default function Content({previewUrl, results}) {
  return (
    <div className="content-section">
      <div className="left-panel">
        {previewUrl && (
          <div className="preview-section">
            <p>Your Uploaded Image</p>
            <img
              src={previewUrl}
              alt="Query"
              className="preview-img"
            />
          </div>
        )}

      </div>
      <div className="right-panel">
        {results.length > 0 && (
          <div className="results-section">
            <p>Fashion Styles</p>
            <div className="results-grid">
              {results.map((item, i) => (
                <div
                  key={i}
                  className="result-card"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <img
                    src={`${API_BASE_URL}${item.image_url}`}
                    alt={`Recommendation ${i + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}