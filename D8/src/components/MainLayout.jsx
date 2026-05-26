import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useState } from "react";
const MainLayout = () => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const handleAddToCart = (product) => {
    const existingItem = cart.find((c) => c.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((c) =>
          c.id !== product.id ? c : { ...c, quantity: c.quantity + 1 },
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
  const handleRemove = (product) => {
    if (product.quantity === 1) {
      setCart(cart.filter((i) => i.id !== product.id));
    } else {
      setCart(
        cart.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity - 1 } : i,
        ),
      );
    }
  };
  const handleUpdate = (product) => {
    setCart(
      cart.map((i) =>
        i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
      ),
    );
  };
  const login = () => {
    setUser({ name: "Tam", role: "Sinh Vien" });
  };
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalItem = cart.reduce((sum, i) => sum + i.quantity, 0);
  return (
    <>
      <Header totalItem={totalItem} />
      <main className="main-container">
        <Outlet
          context={{
            user,
            cart,
            totalItem,

            handleAddToCart,
            handleRemove,
            handleUpdate,
            login,
          }}
        />
      </main>
      <Footer />
    </>
  );
};
export default MainLayout;
