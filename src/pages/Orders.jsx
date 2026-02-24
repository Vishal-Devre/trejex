import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { FiPackage, FiTruck, FiCheckCircle } from "react-icons/fi";
import "./Orders.css";

const demoOrders = [
  {
    id: "ORD-2026-001",
    date: "Feb 20, 2026",
    status: "Delivered",
    total: 12499,
    items: [
      {
        name: "Air Max Pulse",
        brand: "Nike",
        size: 9,
        qty: 1,
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200",
      },
    ],
  },
  {
    id: "ORD-2026-002",
    date: "Feb 15, 2026",
    status: "In Transit",
    total: 8999,
    items: [
      {
        name: "Classic Leather Oxfords",
        brand: "Clarks",
        size: 10,
        qty: 1,
        image:
          "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=200",
      },
    ],
  },
  {
    id: "ORD-2026-003",
    date: "Feb 10, 2026",
    status: "Processing",
    total: 16999,
    items: [
      {
        name: "UltraBoost 23",
        brand: "Adidas",
        size: 8,
        qty: 1,
        image:
          "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=200",
      },
    ],
  },
];

const statusIcon = {
  Delivered: <FiCheckCircle />,
  "In Transit": <FiTruck />,
  Processing: <FiPackage />,
};

const statusColor = {
  Delivered: "#22c55e",
  "In Transit": "#f59e0b",
  Processing: "#6366f1",
};

export default function Orders() {
  return (
    <div className="orders-page">
      <div className="orders-container">
        <Breadcrumb
          items={[{ label: "Home", path: "/" }, { label: "Orders" }]}
        />
        <h1>My Orders</h1>

        <div className="orders-list">
          {demoOrders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>
                  <span className="order-id">{order.id}</span>
                  <span className="order-date">{order.date}</span>
                </div>
                <span
                  className="order-status"
                  style={{
                    color: statusColor[order.status],
                    borderColor: statusColor[order.status],
                  }}
                >
                  {statusIcon[order.status]} {order.status}
                </span>
              </div>
              {order.items.map((item, i) => (
                <div key={i} className="order-item">
                  <img src={item.image} alt={item.name} />
                  <div className="order-item-info">
                    <span className="order-item-brand">{item.brand}</span>
                    <h4>{item.name}</h4>
                    <span>
                      Size: UK {item.size} | Qty: {item.qty}
                    </span>
                  </div>
                </div>
              ))}
              <div className="order-footer">
                <span className="order-total">
                  Total: ₹{order.total.toLocaleString()}
                </span>
                <button className="track-btn">Track Order</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
