import {
  FiUser,
  FiMail,
  FiMapPin,
  FiPhone,
  FiEdit2,
  FiPackage,
  FiHeart,
  FiSettings,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import "./Profile.css";

export default function Profile() {
  return (
    <div className="profile-page">
      <div className="profile-container">
        <Breadcrumb
          items={[{ label: "Home", path: "/" }, { label: "Profile" }]}
        />
        <div className="profile-layout">
          <div className="profile-sidebar">
            <div className="profile-avatar">
              <div className="avatar-circle">
                <FiUser />
              </div>
              <h3>John Doe</h3>
              <p>john.doe@email.com</p>
            </div>
            <nav className="profile-nav">
              <a href="#" className="profile-nav-item active">
                <FiUser /> My Profile
              </a>
              <Link to="/orders" className="profile-nav-item">
                <FiPackage /> My Orders
              </Link>
              <Link to="/wishlist" className="profile-nav-item">
                <FiHeart /> Wishlist
              </Link>
              <a href="#" className="profile-nav-item">
                <FiSettings /> Settings
              </a>
            </nav>
          </div>
          <div className="profile-content">
            <div className="profile-section">
              <div className="section-title">
                <h2>Personal Information</h2>
                <button className="edit-btn">
                  <FiEdit2 /> Edit
                </button>
              </div>
              <div className="info-grid">
                <div className="info-item">
                  <label>Full Name</label>
                  <p>John Doe</p>
                </div>
                <div className="info-item">
                  <label>Email</label>
                  <p>john.doe@email.com</p>
                </div>
                <div className="info-item">
                  <label>Phone</label>
                  <p>+91 98765 43210</p>
                </div>
                <div className="info-item">
                  <label>Gender</label>
                  <p>Male</p>
                </div>
              </div>
            </div>
            <div className="profile-section">
              <div className="section-title">
                <h2>Shipping Address</h2>
                <button className="edit-btn">
                  <FiEdit2 /> Edit
                </button>
              </div>
              <div className="address-card">
                <FiMapPin />
                <div>
                  <strong>Home</strong>
                  <p>123 Main Street, Apartment 4B</p>
                  <p>Mumbai, Maharashtra 400001</p>
                  <p>India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
