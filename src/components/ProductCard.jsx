import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FiHeart, FiShoppingCart, FiStar } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const discountedPrice = Math.round(
    product.price - (product.price * product.discount) / 100,
  );
  const wishlisted = isInWishlist(product.id);

  return (
    <div className="product-card">
      <div className="product-card-image">
        <Link to={`/product/${product.id}`}>
          <img src={product.images[0]} alt={product.name} loading="lazy" />
        </Link>
        {product.discount > 0 && (
          <span className="discount-badge">-{product.discount}%</span>
        )}
        <button
          className={`wishlist-btn ${wishlisted ? "wishlisted" : ""}`}
          onClick={() => toggleWishlist(product)}
        >
          {wishlisted ? <FaHeart /> : <FiHeart />}
        </button>
        <button
          className="quick-add-btn"
          onClick={() => addToCart(product, product.sizes[0])}
        >
          <FiShoppingCart /> Add to Cart
        </button>
      </div>
      <Link to={`/product/${product.id}`} className="product-card-info">
        <span className="product-brand">{product.brand}</span>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-rating">
          <FiStar className="star-icon" />
          <span>{product.rating}</span>
          <span className="review-count">({product.reviews})</span>
        </div>
        <div className="product-pricing">
          <span className="current-price">
            ₹{discountedPrice.toLocaleString()}
          </span>
          {product.discount > 0 && (
            <>
              <span className="original-price">
                ₹{product.price.toLocaleString()}
              </span>
              <span className="discount-text">{product.discount}% off</span>
            </>
          )}
        </div>
      </Link>
    </div>
  );
}
