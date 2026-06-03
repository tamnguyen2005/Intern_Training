import { useOutletContext } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useCartStore } from "../stores/cart.store";
const CartPage = () => {
  const item = useCartStore((state) => state.item);
  const updateCart = useCartStore((state) => state.updateQuantity);
  const removeCart = useCartStore((state) => state.removeFromCart);
  return (
    <>
      {item.map((i) => (
        <CartItem key={i.product.id} onUpdateQuantity={updateCart} onRemove={removeCart} item={i} />
      ))}
    </>
  );
};
export default CartPage;
