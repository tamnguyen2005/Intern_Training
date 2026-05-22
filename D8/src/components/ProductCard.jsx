import "../css/ProductCard.css";
import { Currency_format } from "../constant/config";
const ProductCard = ({ product }) => {
  const formattedPrice = new Intl.NumberFormat(Currency_format.Locale, {
    style: Currency_format.Style,
    currency: Currency_format.Currency,
  }).format(product.price);
  return (
    <div className="card-container">
      <img src={product.url} alt="product-image" />
      <h3>{product.name}</h3>
      <h4>{formattedPrice}</h4>
      <p>{product.description}</p>
    </div>
  );
};
export default ProductCard;
