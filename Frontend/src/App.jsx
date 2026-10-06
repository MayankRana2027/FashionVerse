import { Routes, Route, Link } from "react-router-dom";
import "./styles/main.css";
import "./styles/content.css";
import "./styles/upload.css";
import "./styles/about.css";
import "./styles/items.css";
import "./styles/items2.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Search from "./pages/Search";

function App() {
  return (
    <div className="app">
      <div className="nav-links">
        <Link className="home-link" to="/">Home</Link>
        <Link className="search-link" to="/search">Search</Link>
        <Link className="about-link" to="/about">About</Link>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;