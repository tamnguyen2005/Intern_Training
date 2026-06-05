import { Product } from "../types/product.type";
import { Link } from "react-router-dom";
import "../css/AdminProductCard.css";
interface AdminProductProps {
  product: Product;
  deletingId: number;
  handleDelete: (id: number) => Promise<void>;
  handleUpdate: () => void;
}
const AdminProductCard = ({
  product,
  deletingId,
  handleDelete,
  handleUpdate,
}: AdminProductProps) => {
  return (
      <div className="card-container">
        <Link to={`/product/${product.id}`}>
          <img src={product.imageUrl} alt="product-image" />
        </Link>
        <div className="card-content">
          <h3>{product.name}</h3>
          <h4>{product.price}</h4>
          <p>{product.description}</p>
          <div className="card-btn">
            <button
              onClick={() => handleDelete(product.id)}
              disabled={deletingId === product.id}
            >
              {deletingId === product.id ? "⏳ Đang xóa..." : "🗑️ Xóa"}
            </button>
            <button onClick={() => handleUpdate()}>🔄 Sửa</button>
          </div>
        </div>
      </div>
  );
};
export default AdminProductCard;
