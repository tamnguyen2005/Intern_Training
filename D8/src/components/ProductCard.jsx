import "../css/ProductCard.css";
import { Currency_format } from "../constant/config";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/cart.store";
const ProductCard = ({ product }) => {
  const formattedPrice = new Intl.NumberFormat(Currency_format.Locale, {
    style: Currency_format.Style,
    currency: Currency_format.Currency,
  }).format(product.price);
  const addToCart = useCartStore((state) => state.addToCart);
  return (
    <div className="card-container">
      <Link to={`/product/${product.id}`}>
        <img src={product.imageUrl} alt="product-image" />
      </Link>
      <div className="card-content">
        <h3>{product.name}</h3>
        <h4>{formattedPrice}</h4>
        <p>{product.description}</p>
        <button
          onClick={() => {
            addToCart(product);
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};
export default ProductCard;
