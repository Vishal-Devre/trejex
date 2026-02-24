import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Breadcrumb from "../components/Breadcrumb";
import ProductCard from "../components/ProductCard";
import { FiHeart } from "react-icons/fi";
import "./Wishlist.css";

export default function Wishlist() {
  const { wishlist } = useCart();

  return (
    <div className="wishlist-page">
      <div className="wishlist-container">
        <Breadcrumb
          items={[{ label: "Home", path: "/" }, { label: "Wishlist" }]}
        />
        <h1>My Wishlist ({wishlist.length})</h1>

        {wishlist.length === 0 ? (
          <div className="wishlist-empty">
            <FiHeart className="empty-icon" />
            <h2>Your wishlist is empty</h2>
            <p>Save items you love by clicking the heart icon</p>
            <Link to="/" className="shop-now-btn">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="products-grid">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
