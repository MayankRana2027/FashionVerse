const API_BASE_URL = "http://localhost:8000";

const hashString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};


// ---- Price settings: change these ----
const MIN_PRICE = 1299;    // lowest MRP
const MAX_PRICE = 5999;   // highest MRP
const DISCOUNTS = [10, 15, 20, 30, 40, 50, 60];
// --------------------------------------

// Returns { sale, mrp, off } e.g. { sale: 497, mrp: 599, off: 17 }
const getPriceInfo = (seed) => {
  // Random-looking MRP between MIN_PRICE and MAX_PRICE
  const rawMrp = MIN_PRICE + (hashString(seed + "mrp") % (MAX_PRICE - MIN_PRICE + 1));
  const mrp = Math.round(rawMrp / 100) * 100 - 1; // ends in 99, e.g. 599

  const discount = DISCOUNTS[hashString(seed + "off") % DISCOUNTS.length];
  const sale = Math.round((mrp * (1 - discount / 100)) / 10) * 10 - 3; // e.g. 497
  const off = Math.round(((mrp - sale) / mrp) * 100);

  return { sale, mrp, off };
};

const fmt = (n) => `₹${n.toLocaleString("en-IN")}`;

export default function Content({ previewUrl, results }) {
  return (
    <div className="content-section">
      <div className="left-panel">
        {previewUrl && (
          <div className="preview-section">
            <p>Your Uploaded Image</p>
            <img src={previewUrl} alt="Query" className="preview-img" />
          </div>
        )}
      </div>

      <div className="right-panel">
        {results.length > 0 && (
          <div className="results-section">
            <p>Fashion Styles</p>
            <div className="results-grid">
              {results.map((item, i) => {
                const { sale, mrp, off } = getPriceInfo(item.image_url);
                return (
                  <div
                    key={i}
                    className="result-card"
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    <img
                      src={`${API_BASE_URL}${item.image_url}`}
                      alt={`Recommendation ${i + 1}`}
                    />
                    <div className="price-tag">
                      <span className="price-sale">{fmt(sale)}</span>
                      <span className="price-mrp-wrap">
                        MRP <del className="price-mrp">{fmt(mrp)}</del>
                      </span>
                      <span className="price-off">({off}% OFF)</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}