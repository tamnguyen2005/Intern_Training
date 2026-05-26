import ProductCard from "./ProductCard";
import "../css/ProductList.css";
import { Link } from "react-router-dom";
const ProductList = ({ products = [], handleAddToCart }) => {
  if (products.length === 0) {
    return (
      <div className="product-container">
        <h1>There is no product here!</h1>
      </div>
    );
  }
  return (
    <div className="product-container">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} handleAddToCart={handleAddToCart} />
      ))}
    </div>
  );
};
export default ProductList;
