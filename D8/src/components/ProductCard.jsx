import "../css/ProductCard.css";
import { Currency_format } from "../constant/config";
const ProductCard = ({ product, handleAddToCart }) => {
  const formattedPrice = new Intl.NumberFormat(Currency_format.Locale, {
    style: Currency_format.Style,
    currency: Currency_format.Currency,
  }).format(product.price);
  return (
    <div className="card-container">
      <img src={product.url} alt="product-image" />
      <div className="card-content">
        <h3>{product.name}</h3>
        <h4>{formattedPrice}</h4>
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
export default ProductCard;
