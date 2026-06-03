import { Currency_format } from "../constant/config";
import "../css/CartItem.css";
const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const formattedPrice = new Intl.NumberFormat(Currency_format.Locale, {
    style: Currency_format.Style,
    currency: Currency_format.Currency,
  }).format(item.product.price);
  return (
    <div className="cart-item">
      <img src={item.product.imageUrl} />
      <div className="cart-content">
        <h2>{item.product.name}</h2>
        <span>{formattedPrice}</span>
        <div className="cart-quantity">
          <button
            onClick={() => {
              onUpdateQuantity(item.product.id, item.quantity + 1);
            }}
          >
            +
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() => {
              onUpdateQuantity(item.product.id, item.quantity - 1);
            }}
          >
            -
          </button>
        </div>
        <button onClick={() => onRemove(item.product.id)}>Xóa sản phẩm</button>
      </div>
    </div>
  );
};
export default CartItem;
