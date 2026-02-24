import Breadcrumb from "../components/Breadcrumb";
import { FiTarget, FiUsers, FiAward, FiGlobe } from "react-icons/fi";
import "./StaticPages.css";

export default function About() {
  return (
    <div className="static-page">
      <div className="static-container">
        <Breadcrumb
          items={[{ label: "Home", path: "/" }, { label: "About Us" }]}
        />

        <div className="page-hero">
          <h1>About ShoeStore</h1>
          <p>
            We're on a mission to make premium footwear accessible to everyone.
            Since 2020, we've been curating the finest collection of shoes from
            around the world.
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <FiTarget />
            </div>
            <h3>500+</h3>
            <p>Products</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FiUsers />
            </div>
            <h3>50,000+</h3>
            <p>Happy Customers</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FiAward />
            </div>
            <h3>100+</h3>
            <p>Brands</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FiGlobe />
            </div>
            <h3>25+</h3>
            <p>Countries</p>
          </div>
        </div>

        <div className="content-section">
          <h2>Our Story</h2>
          <p>
            ShoeStore was born from a simple idea — everyone deserves great
            shoes. What started as a small online store has grown into one of
            India's most trusted footwear destinations. We partner with top
            global brands to bring you authentic, premium shoes at the best
            prices.
          </p>
          <p>
            Our team of shoe enthusiasts carefully curates each collection,
            ensuring that every pair meets our high standards of quality,
            comfort, and style. Whether you're looking for running shoes, formal
            oxfords, or casual sneakers, we've got you covered.
          </p>
        </div>

        <div className="content-section">
          <h2>Why Choose Us?</h2>
          <div className="features-list">
            <div className="feature-card">
              <h4>✅ 100% Authentic</h4>
              <p>
                All products sourced directly from brands or authorized
                distributors
              </p>
            </div>
            <div className="feature-card">
              <h4>🚚 Free Shipping</h4>
              <p>Free delivery on all orders above ₹999 across India</p>
            </div>
            <div className="feature-card">
              <h4>↩️ Easy Returns</h4>
              <p>30-day hassle-free return policy on all products</p>
            </div>
            <div className="feature-card">
              <h4>💬 24/7 Support</h4>
              <p>Our dedicated team is always ready to help you</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
