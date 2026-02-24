import { Link } from "react-router-dom";
import {
  FiInstagram,
  FiTwitter,
  FiFacebook,
  FiYoutube,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";
import logoSvg from "../assets/logo.svg";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src={logoSvg} alt="TREJEX" className="footer-logo-img" />
            </Link>
            <p className="footer-description">
              Your one-stop destination for premium footwear. From sports to
              formal, find the perfect pair that matches your style.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-link">
                <FiInstagram />
              </a>
              <a href="#" className="social-link">
                <FiTwitter />
              </a>
              <a href="#" className="social-link">
                <FiFacebook />
              </a>
              <a href="#" className="social-link">
                <FiYoutube />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/men">Men</Link>
            <Link to="/women">Women</Link>
            <Link to="/category/Sports">Sports</Link>
            <Link to="/category/Casual">Casual</Link>
            <Link to="/category/Formal">Formal</Link>
          </div>

          <div className="footer-section">
            <h4>Help</h4>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/orders">Track Order</Link>
            <a href="#">Return Policy</a>
            <a href="#">Shipping Info</a>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <div className="footer-contact">
              <FiMail />
              <span>support@trejex.com</span>
            </div>
            <div className="footer-contact">
              <FiPhone />
              <span>+91 98765 43210</span>
            </div>
            <div className="footer-contact">
              <FiMapPin />
              <span>Mumbai, India</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 TREJEX. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
