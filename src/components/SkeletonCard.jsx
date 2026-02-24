import "./SkeletonCard.css";

export default function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image skeleton-pulse" />
      <div className="skeleton-info">
        <div
          className="skeleton-line skeleton-pulse"
          style={{ width: "40%" }}
        />
        <div
          className="skeleton-line skeleton-pulse"
          style={{ width: "80%" }}
        />
        <div
          className="skeleton-line skeleton-pulse"
          style={{ width: "60%" }}
        />
        <div
          className="skeleton-line skeleton-pulse"
          style={{ width: "50%" }}
        />
      </div>
    </div>
  );
}
