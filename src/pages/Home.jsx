import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import products from "../data/products";
import { useCart } from "../context/CartContext";
import {
  FiArrowRight,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiHeadphones,
} from "react-icons/fi";
import "./Home.css";

const featuredCategories = [
  {
    name: "Men",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    path: "/men",
  },
  {
    name: "Women",
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400",
    path: "/women",
  },
  {
    name: "Sports",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400",
    path: "/category/Sports",
  },
  {
    name: "Casual",
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400",
    path: "/category/Casual",
  },
  {
    name: "Formal",
    image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400",
    path: "/category/Formal",
  },
];

const features = [
  { icon: <FiTruck />, title: "Free Shipping", desc: "On orders above ₹999" },
  { icon: <FiShield />, title: "Secure Payment", desc: "100% secure checkout" },
  {
    icon: <FiRefreshCw />,
    title: "Easy Returns",
    desc: "30-day return policy",
  },
  {
    icon: <FiHeadphones />,
    title: "24/7 Support",
    desc: "Dedicated support team",
  },
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { recentlyViewed } = useCart();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const featured = products.filter((p) => p.rating >= 4.5).slice(0, 8);
  const newArrivals = products.slice(-8);
  const bestDeals = [...products]
    .sort((a, b) => b.discount - a.discount)
    .slice(0, 4);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">🔥 New Collection 2026</div>
          <h1 className="hero-title">
            Step Into <span className="hero-gradient">Style</span>
          </h1>
          <p className="hero-subtitle">
            Discover the latest trends in footwear. From athletic performance to
            street style — find your perfect pair.
          </p>
          <div className="hero-actions">
            <Link to="/men" className="hero-btn primary">
              Shop Men <FiArrowRight />
            </Link>
            <Link to="/women" className="hero-btn secondary">
              Shop Women <FiArrowRight />
            </Link>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">Products</span>
            </div>
            <div className="stat">
              <span className="stat-number">50k+</span>
              <span className="stat-label">Customers</span>
            </div>
            <div className="stat">
              <span className="stat-number">100+</span>
              <span className="stat-label">Brands</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600"
            alt="Featured Shoe"
          />
          <div className="hero-float-card">
            <span className="float-discount">30% OFF</span>
            <span className="float-text">Limited Time Offer</span>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="features-bar">
        {features.map((f, i) => (
          <div key={i} className="feature-item">
            <div className="feature-icon">{f.icon}</div>
            <div>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Categories */}
      <section className="section">
        <div className="section-header">
          <h2>Shop by Category</h2>
          <p>Find your perfect style</p>
        </div>
        <div className="categories-grid">
          {featuredCategories.map((cat) => (
            <Link key={cat.name} to={cat.path} className="category-card">
              <img src={cat.image} alt={cat.name} loading="lazy" />
              <div className="category-overlay">
                <h3>{cat.name}</h3>
                <span>
                  Explore <FiArrowRight />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="section">
        <div className="section-header">
          <h2>Featured Products</h2>
          <p>Handpicked just for you</p>
        </div>
        <div className="products-grid">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="promo-banner">
        <div className="promo-content">
          <span className="promo-tag">Limited Time</span>
          <h2>Summer Sale Up To 40% Off</h2>
          <p>Get the best deals on your favourite brands. Don't miss out!</p>
          <Link to="/men" className="hero-btn primary">
            Shop Now <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* Best Deals */}
      <section className="section">
        <div className="section-header">
          <h2>🔥 Best Deals</h2>
          <p>Biggest discounts right now</p>
        </div>
        <div className="products-grid">
          {bestDeals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section">
        <div className="section-header">
          <h2>New Arrivals</h2>
          <p>Fresh styles just dropped</p>
        </div>
        <div className="products-grid">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      </section>

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <section className="section">
          <div className="section-header">
            <h2>Recently Viewed</h2>
            <p>Continue where you left off</p>
          </div>
          <div className="products-grid">
            {recentlyViewed.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="newsletter">
        <div className="newsletter-content">
          <h2>Stay in the Loop</h2>
          <p>Subscribe to get exclusive deals and new arrivals updates</p>
          <form
            className="newsletter-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <input type="email" placeholder="Enter your email address" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}
