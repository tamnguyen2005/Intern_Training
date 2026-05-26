import { useOutletContext } from "react-router-dom";
import CartItem from "../components/CartItem";
const CartPage = () => {
  const { cart, totalPrice, handleRemove, handleUpdate } = useOutletContext();
  return (
    <>
      {cart.map((i) => (
        <CartItem
          key={i.id}
          onRemove={handleRemove}
          onUpdateQuantity={handleUpdate}
          item={i}
        />
      ))}
    </>
  );
};
export default CartPage;
