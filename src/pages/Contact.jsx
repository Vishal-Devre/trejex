import { useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import toast from "react-hot-toast";
import "./StaticPages.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully! (Demo)");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="static-page">
      <div className="static-container">
        <Breadcrumb
          items={[{ label: "Home", path: "/" }, { label: "Contact Us" }]}
        />

        <div className="page-hero">
          <h1>Contact Us</h1>
          <p>Have a question? We'd love to hear from you.</p>
        </div>

        <div className="contact-layout">
          <div className="contact-info">
            <div className="contact-card">
              <FiMail className="contact-icon" />
              <h4>Email</h4>
              <p>support@shoestore.com</p>
            </div>
            <div className="contact-card">
              <FiPhone className="contact-icon" />
              <h4>Phone</h4>
              <p>+91 98765 43210</p>
            </div>
            <div className="contact-card">
              <FiMapPin className="contact-icon" />
              <h4>Address</h4>
              <p>123 ShoeStore HQ, Mumbai, India</p>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              required
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />
            <button type="submit" className="submit-btn">
              <FiSend /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
