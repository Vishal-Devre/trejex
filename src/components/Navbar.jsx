import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import {
  FiShoppingCart,
  FiHeart,
  FiSun,
  FiMoon,
  FiSearch,
  FiMenu,
  FiX,
  FiUser,
  FiChevronDown,
} from "react-icons/fi";
import products from "../data/products";
import logoSvg from "../assets/logo.svg";
import "./Navbar.css";

const categories = [
  { name: "Men", path: "/men" },
  { name: "Women", path: "/women" },
  { name: "Sports", path: "/category/Sports" },
  { name: "Casual", path: "/category/Casual" },
  { name: "Formal", path: "/category/Formal" },
];

export default function Navbar() {
  const { cartCount } = useCart();
  const { darkMode, toggleDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filtered = products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        .slice(0, 6);
      setSearchResults(filtered);
      setShowSearch(true);
    } else {
      setSearchResults([]);
      setShowSearch(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery("");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logoSvg} alt="TREJEX" className="logo-img" />
        </Link>

        <form
          className="navbar-search"
          ref={searchRef}
          onSubmit={handleSearchSubmit}
        >
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search shoes, brands, categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {showSearch && searchResults.length > 0 && (
            <div className="search-dropdown">
              {searchResults.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="search-result-item"
                  onClick={() => {
                    setShowSearch(false);
                    setSearchQuery("");
                  }}
                >
                  <img src={product.images[0]} alt={product.name} />
                  <div className="search-result-info">
                    <span className="search-result-name">{product.name}</span>
                    <span className="search-result-brand">{product.brand}</span>
                    <span className="search-result-price">
                      ₹
                      {Math.round(
                        product.price -
                          (product.price * product.discount) / 100,
                      ).toLocaleString()}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </form>

        <div className="navbar-links">
          <div
            className="nav-categories"
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
          >
            <button className="nav-link categories-btn">
              Categories <FiChevronDown />
            </button>
            {showCategories && (
              <div className="categories-dropdown">
                {categories.map((cat) => (
                  <Link
                    key={cat.name}
                    to={cat.path}
                    className="category-item"
                    onClick={() => setShowCategories(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <button
            className="nav-icon-btn theme-toggle"
            onClick={toggleDarkMode}
            title={darkMode ? "Light Mode" : "Dark Mode"}
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>

          <Link to="/wishlist" className="nav-icon-btn" title="Wishlist">
            <FiHeart />
          </Link>

          <Link to="/cart" className="nav-icon-btn cart-btn" title="Cart">
            <FiShoppingCart />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          <Link to="/login" className="nav-icon-btn" title="Account">
            <FiUser />
          </Link>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu">
          <form className="mobile-search" onSubmit={handleSearchSubmit}>
            <FiSearch />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={cat.path}
              className="mobile-menu-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              {cat.name}
            </Link>
          ))}
          <div className="mobile-menu-actions">
            <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)}>
              <FiHeart /> Wishlist
            </Link>
            <Link to="/cart" onClick={() => setMobileMenuOpen(false)}>
              <FiShoppingCart /> Cart ({cartCount})
            </Link>
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
              <FiUser /> Login
            </Link>
            <button onClick={toggleDarkMode} className="mobile-theme-btn">
              {darkMode ? <FiSun /> : <FiMoon />}
              {darkMode ? " Light Mode" : " Dark Mode"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
