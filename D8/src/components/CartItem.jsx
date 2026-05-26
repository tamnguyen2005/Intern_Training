import { Currency_format } from "../constant/config";
import "../css/CartItem.css";
const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const formattedPrice = new Intl.NumberFormat(Currency_format.Locale, {
    style: Currency_format.Style,
    currency: Currency_format.Currency,
  }).format(item.price);
  return (
    <div className="cart-item">
      <img src={item.url} />
      <div className="cart-content">
        <h2>{item.name}</h2>
        <span>{formattedPrice}</span>
        <div className="cart-quantity">
          <button
            onClick={() => {
              onUpdateQuantity(item);
            }}
          >
            +
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() => {
              onRemove(item);
            }}
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};
export default CartItem;
