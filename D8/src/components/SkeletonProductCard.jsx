import "../css/SkeletonProductCard.css";
const SkeletonProductCard = () => {
  return (
    <div className="card-container">
      <div className="card-skeleton-img skeleton"></div>
      <div className="card-content">
        <div className="card-skeleton-name skeleton"></div>
        <div className="card-skeleton-price skeleton"></div>
        <div className="card-skeleton-desc skeleton"></div>
        <div className="card-skeleton-btn skeleton"></div>
      </div>
    </div>
  );
};
export default SkeletonProductCard;
