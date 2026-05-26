import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import getProduct from "./data/product";
import ErrorBoundary from "./components/ErrorBoundary";
import Cart from "./components/Cart";
import "./css/App.css";
function App() {
  const products = getProduct();
  const [cart, setCart] = useState([]);
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
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalItem = cart.reduce((sum, i) => sum + i.quantity, 0);
  return (
    <>
      <Header cart={totalItem} />
      <main className="main-container">
        <ErrorBoundary>
          <ProductList products={products} handleAddToCart={handleAddToCart} />
        </ErrorBoundary>
        <ErrorBoundary>
          <Cart
            items={cart}
            totalPrice={totalPrice}
            onRemove={handleRemove}
            onUpdateQuantity={handleUpdate}
          />
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
}

export default App;
