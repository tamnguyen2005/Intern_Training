import CartItem from "./CartItem";
import "../css/Cart.css";
const Cart = ({ items = [], totalPrice, onUpdateQuantity, onRemove }) => {
  if (items.length === 0)
    return (
      <div className="cart-container">
        <span>Tổng tiền: {totalPrice}</span>
        <div className="cart-error">Chưa có sản phẩm nào trong giỏ hàng</div>
      </div>
    );
  return (
    <div className="cart-container">
      <span>Tổng tiền: {totalPrice}</span>
      {items.map((i) => (
        <CartItem
          key={i.id}
          item={i}
          onRemove={onRemove}
          onUpdateQuantity={onUpdateQuantity}
        />
      ))}
    </div>
  );
};
export default Cart;
