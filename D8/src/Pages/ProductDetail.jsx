import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import getProduct from "../data/product";
import "../css/ProductDetail.css";

const ProductDetail = () => {
  const products = getProduct();
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleAddToCart } = useOutletContext();
  const product = products.find((p) => p.id === parseInt(id));
  if (!product) {
    return (
      <>
        <h2>Sản phẩm này không tồn tại hoặc đã bị xóa !</h2>
        <button onClick={() => navigate("/")}>Back</button>
      </>
    );
  }
  return (
    <div className="detail-container">
      <div className="detail-img">
        <img src={product.url} alt="" />
      </div>
      <div className="detail-cotent">
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </button>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <button
          onClick={() => {
            handleAddToCart(product);
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};
export default ProductDetail;
