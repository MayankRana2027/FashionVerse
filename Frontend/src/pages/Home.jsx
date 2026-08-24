import Items from "../components/Items";
import Males from "../components/Males";
import Females from "../components/Females";

export default function Home() {
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

      <Items />
      <Males />
      <Females />
    </>
  );
}