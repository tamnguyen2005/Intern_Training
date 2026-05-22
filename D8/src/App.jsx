import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import getProduct from "./data/product";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  const products = getProduct();
  return (
    <>
      <Header />
      <ErrorBoundary>
        <ProductList products={products} />
      </ErrorBoundary>
      <Footer />
    </>
  );
}

export default App;
