import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Breadcrumb from "../components/Breadcrumb";
import ProductCard from "../components/ProductCard";
import products from "../data/products";
import {
  FiStar,
  FiShoppingCart,
  FiHeart,
  FiTruck,
  FiShield,
  FiMinus,
  FiPlus,
} from "react-icons/fi";
import { FaHeart, FaStar } from "react-icons/fa";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart, toggleWishlist, isInWishlist, addToRecentlyViewed } =
    useCart();
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

  const product = products.find((p) => p.id === Number(id));

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
      setSelectedSize(product.sizes[0]);
      setActiveImage(0);
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="not-found-container">
          <h2>Product not found</h2>
          <Link to="/" className="back-home-btn">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const discountedPrice = Math.round(
    product.price - (product.price * product.discount) / 100,
  );
  const savings = product.price - discountedPrice;
  const wishlisted = isInWishlist(product.id);

  const similarProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: product.gender, path: `/${product.gender.toLowerCase()}` },
    { label: product.category, path: `/category/${product.category}` },
    { label: product.name },
  ];

  return (
    <div className="product-detail-page">
      <div className="detail-container">
        <Breadcrumb items={breadcrumbItems} />

        <div className="detail-grid">
          {/* Image Gallery */}
          <div className="detail-gallery">
            <div className="gallery-main">
              <img src={product.images[activeImage]} alt={product.name} />
              {product.discount > 0 && (
                <span className="detail-discount-badge">
                  -{product.discount}%
                </span>
              )}
            </div>
            <div className="gallery-thumbnails">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  className={`thumbnail ${activeImage === i ? "active" : ""}`}
                  onClick={() => setActiveImage(i)}
                >
                  <img src={img} alt={`${product.name} ${i + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="detail-info">
            <span className="detail-brand">{product.brand}</span>
            <h1 className="detail-name">{product.name}</h1>

            <div className="detail-rating">
              <div className="stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < Math.floor(product.rating)
                        ? "star-filled"
                        : "star-empty"
                    }
                  />
                ))}
              </div>
              <span className="rating-value">{product.rating}</span>
              <span className="rating-count">({product.reviews} reviews)</span>
            </div>

            <div className="detail-pricing">
              <span className="detail-current-price">
                ₹{discountedPrice.toLocaleString()}
              </span>
              {product.discount > 0 && (
                <>
                  <span className="detail-original-price">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className="detail-savings">
                    You save ₹{savings.toLocaleString()}
                  </span>
                </>
              )}
            </div>

            <div className="detail-section">
              <h4>Select Size</h4>
              <div className="size-grid">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? "active" : ""}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    UK {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="detail-section">
              <h4>Color Options</h4>
              <div className="color-options">
                {product.colors.map((color) => (
                  <span key={color} className="color-tag">
                    {color}
                  </span>
                ))}
              </div>
            </div>

            <div className="detail-section">
              <h4>Quantity</h4>
              <div className="quantity-selector">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                  <FiMinus />
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)}>
                  <FiPlus />
                </button>
              </div>
            </div>

            <div className="detail-actions">
              <button
                className="add-to-cart-btn"
                onClick={() => addToCart(product, selectedSize, quantity)}
              >
                <FiShoppingCart /> Add to Cart
              </button>
              <button
                className={`wishlist-toggle-btn ${wishlisted ? "wishlisted" : ""}`}
                onClick={() => toggleWishlist(product)}
              >
                {wishlisted ? <FaHeart /> : <FiHeart />}
              </button>
            </div>

            <div className="detail-features">
              <div className="feature">
                <FiTruck /> Free Delivery on orders above ₹999
              </div>
              <div className="feature">
                <FiShield /> 30-day easy returns
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="detail-tabs">
          <div className="tabs-header">
            <button
              className={activeTab === "description" ? "active" : ""}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              className={activeTab === "reviews" ? "active" : ""}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews ({product.reviews})
            </button>
          </div>
          <div className="tabs-content">
            {activeTab === "description" && (
              <div className="tab-description">
                <p>{product.description}</p>
                <ul>
                  <li>Premium quality materials</li>
                  <li>Comfortable cushioned insole</li>
                  <li>Durable outsole for long-lasting wear</li>
                  <li>Available in multiple sizes</li>
                </ul>
              </div>
            )}
            {activeTab === "reviews" && (
              <div className="tab-reviews">
                <div className="review-item">
                  <div className="review-header">
                    <strong>Rahul M.</strong>
                    <div className="review-stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < 5 ? "star-filled" : "star-empty"}
                        />
                      ))}
                    </div>
                  </div>
                  <p>
                    Amazing quality! Very comfortable and stylish. Would
                    definitely recommend.
                  </p>
                </div>
                <div className="review-item">
                  <div className="review-header">
                    <strong>Priya S.</strong>
                    <div className="review-stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < 4 ? "star-filled" : "star-empty"}
                        />
                      ))}
                    </div>
                  </div>
                  <p>Good fit and great design. Delivery was fast too!</p>
                </div>
                <div className="review-item">
                  <div className="review-header">
                    <strong>Amit K.</strong>
                    <div className="review-stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < 5 ? "star-filled" : "star-empty"}
                        />
                      ))}
                    </div>
                  </div>
                  <p>
                    Best purchase I've made! Perfect for daily use and the
                    cushioning is excellent.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <section className="similar-products">
            <h2>Similar Products</h2>
            <div className="products-grid">
              {similarProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
