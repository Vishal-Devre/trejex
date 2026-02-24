import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Breadcrumb from "../components/Breadcrumb";
import {
  FiTrash2,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiArrowRight,
} from "react-icons/fi";
import "./Cart.css";

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
  } = useCart();

  const breadcrumbItems = [{ label: "Home", path: "/" }, { label: "Cart" }];

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <Breadcrumb items={breadcrumbItems} />
          <div className="cart-empty">
            <FiShoppingBag className="empty-icon" />
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/" className="shop-now-btn">
              Start Shopping <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <Breadcrumb items={breadcrumbItems} />
        <h1>Shopping Cart ({cartCount} items)</h1>

        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map((item) => {
              const discountedPrice = Math.round(
                item.price - (item.price * item.discount) / 100,
              );
              return (
                <div
                  key={`${item.id}-${item.selectedSize}`}
                  className="cart-item"
                >
                  <Link to={`/product/${item.id}`} className="cart-item-image">
                    <img src={item.images[0]} alt={item.name} />
                  </Link>
                  <div className="cart-item-info">
                    <div className="cart-item-header">
                      <div>
                        <span className="cart-item-brand">{item.brand}</span>
                        <Link
                          to={`/product/${item.id}`}
                          className="cart-item-name"
                        >
                          {item.name}
                        </Link>
                        <span className="cart-item-size">
                          Size: UK {item.selectedSize}
                        </span>
                      </div>
                      <button
                        className="cart-remove-btn"
                        onClick={() =>
                          removeFromCart(item.id, item.selectedSize)
                        }
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                    <div className="cart-item-bottom">
                      <div className="cart-quantity">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.selectedSize,
                              item.quantity - 1,
                            )
                          }
                        >
                          <FiMinus />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.selectedSize,
                              item.quantity + 1,
                            )
                          }
                        >
                          <FiPlus />
                        </button>
                      </div>
                      <div className="cart-item-pricing">
                        <span className="cart-price">
                          ₹{(discountedPrice * item.quantity).toLocaleString()}
                        </span>
                        {item.discount > 0 && (
                          <span className="cart-original">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <button className="clear-cart-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal ({cartCount} items)</span>
              <span>₹{Math.round(cartTotal).toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className="free-shipping">
                {cartTotal > 999 ? "FREE" : "₹99"}
              </span>
            </div>
            <div className="summary-row">
              <span>Tax (GST 18%)</span>
              <span>₹{Math.round(cartTotal * 0.18).toLocaleString()}</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-row total">
              <span>Total</span>
              <span>
                ₹
                {Math.round(
                  cartTotal + cartTotal * 0.18 + (cartTotal > 999 ? 0 : 99),
                ).toLocaleString()}
              </span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
            <Link to="/" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
