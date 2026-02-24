import { useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { FiChevronDown } from "react-icons/fi";
import "./StaticPages.css";

const faqData = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        q: "How long does delivery take?",
        a: "Standard delivery takes 5-7 business days. Express delivery is available in 2-3 business days for an additional charge.",
      },
      {
        q: "Do you offer free shipping?",
        a: "Yes! We offer free shipping on all orders above ₹999. For orders below ₹999, a flat shipping fee of ₹99 is applied.",
      },
      {
        q: "Can I track my order?",
        a: "Absolutely! Once your order is shipped, you'll receive a tracking link via email and SMS. You can also track it from your Orders page.",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    questions: [
      {
        q: "What is your return policy?",
        a: "We offer a 30-day hassle-free return policy. Products must be unused, in original packaging with tags attached.",
      },
      {
        q: "How do I initiate a return?",
        a: "Go to My Orders, click on the order you want to return, and select 'Request Return'. Our team will arrange a pickup within 48 hours.",
      },
      {
        q: "How long do refunds take?",
        a: "Refunds are processed within 5-7 business days after we receive the returned product. The amount will be credited to your original payment method.",
      },
    ],
  },
  {
    category: "Products",
    questions: [
      {
        q: "Are all products authentic?",
        a: "Yes, 100%! We source all products directly from brands or their authorized distributors. Every product comes with a certificate of authenticity.",
      },
      {
        q: "How do I find my shoe size?",
        a: "Check our Size Guide available on every product page. We recommend measuring your foot and comparing with our size chart for the best fit.",
      },
      {
        q: "Can I exchange for a different size?",
        a: "Yes! Size exchanges are free. Simply initiate a return and place a new order for the correct size.",
      },
    ],
  },
  {
    category: "Payment",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept Credit/Debit cards, UPI, Net Banking, Wallets (Paytm, PhonePe), and Cash on Delivery (COD).",
      },
      {
        q: "Is my payment information secure?",
        a: "Absolutely. We use bank-grade 256-bit SSL encryption to protect your payment information. We never store your card details.",
      },
    ],
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  let globalIndex = 0;

  return (
    <div className="static-page">
      <div className="static-container">
        <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "FAQ" }]} />

        <div className="page-hero">
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to everything you need to know</p>
        </div>

        <div className="faq-content">
          {faqData.map((section) => (
            <div key={section.category} className="faq-section">
              <h3>{section.category}</h3>
              {section.questions.map((item) => {
                const idx = globalIndex++;
                return (
                  <div
                    key={idx}
                    className={`faq-item ${openIndex === idx ? "open" : ""}`}
                  >
                    <button
                      className="faq-question"
                      onClick={() => toggle(idx)}
                    >
                      <span>{item.q}</span>
                      <FiChevronDown className="faq-chevron" />
                    </button>
                    {openIndex === idx && (
                      <div className="faq-answer">
                        <p>{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
