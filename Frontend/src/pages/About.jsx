import { Link } from "react-router-dom";

const categories = [
  {
    icon: "👕",
    title: "Clothing",
    description:
      "Casual, formal, party wear, sportswear, winter wear, summer wear, wedding wear, traditional, and western outfits",
  },
  {
    icon: "👟",
    title: "Footwear",
    description: "Shoes, sneakers, heels, boots, sandals, and more",
  },
  {
    icon: "👜",
    title: "Bags & Accessories",
    description:
      "Handbags, purses, wallets, watches, glasses, sunglasses, and other accessories",
  },
  {
    icon: "💎",
    title: "Jewellery",
    description: "A variety of jewellery",
  },
  {
    icon: "💄",
    title: "Beauty",
    description: "Makeup and beauty-related items",
  },
  {
    icon: "🏋️",
    title: "Sports & Activewear",
    description: "Sports outfits and athletic clothing",
  },
];

export default function About() {
  return (
    <div className="about">
      <div className="about-container">
        <h1 className="about-title">About FashionVerse</h1>

        <p className="about-intro">
          FashionVerse is an <strong>AI-powered fashion website</strong> that helps you
          discover clothing and fashion items similar to an image you
          upload. Simply upload an image, and FashionVerse analyzes its
          visual features to find the most visually similar products.
        </p>

        <p className="about-subheading">
          Our collection covers a wide variety of fashion categories for{" "}
          <strong>men, women, and kids</strong>, including:
        </p>

        <ul className="category-list">
          {categories.map((cat, i) => (
            <li
              key={cat.title}
              className="category-item"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span className="category-icon">{cat.icon}</span>
              <span>
                <strong>{cat.title}:</strong> {cat.description}
              </span>
            </li>
          ))}
        </ul>

        <p className="about-outro">
          Whether you're looking for a casual outfit, formal wear, party
          look, traditional attire, sportswear, seasonal clothing,
          footwear, accessories, or beauty products, FashionVerse makes it
          easier to explore visually similar styles through AI-powered
          image search.
        </p>

        <p className="about-tagline">
          Upload an image. Discover similar styles. Explore FashionVerse.
        </p>
      </div>
    </div>
  );
}