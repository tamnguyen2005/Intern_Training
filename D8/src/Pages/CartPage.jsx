import { useOutletContext } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useCartStore } from "../stores/cart.store";
import { useEffect, useState } from "react";
const CartPage = () => {
  const item = useCartStore((state) => state.item);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const updateCart = useCartStore((state) => state.updateQuantity);
  const removeCart = useCartStore((state) => state.removeFromCart);
  useEffect(() => {
    try {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    } catch (err) {
      setError("Không thể đồng bộ giỏ hàng !");
      setIsLoading(false);
    }
  }, []);
  if (isLoading) {
    return <h1>Đang kiểm tra giỏ hàng của bạn !</h1>;
  }
  if (error) {
    return <h1>Có lỗi xảy ra ${error}</h1>;
  }
  if (item.length === 0) {
    return <h1>Giỏ hàng trống</h1>;
  }
  return (
    <>
      {item.map((i) => (
        <CartItem
          key={i.product.id}
          onUpdateQuantity={updateCart}
          onRemove={removeCart}
          item={i}
        />
      ))}
    </>
  );
};
export default CartPage;
