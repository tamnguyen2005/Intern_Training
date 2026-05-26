import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import getProduct from "./data/product";
import ErrorBoundary from "./components/ErrorBoundary";
import Cart from "./components/Cart";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers/index.jsx";
import "./css/App.css";
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
