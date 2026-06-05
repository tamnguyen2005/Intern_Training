import ProductCard from "./ProductCard";
import "../css/ProductList.css";
import { Link } from "react-router-dom";
import SkeletonProductCard from "./SkeletonProductCard";
import { SkeletonSize } from "../constant/config";
const ProductList = ({ products = [], skeleton = false }) => {
  if (skeleton === true) {
    return (
      <div className="product-container">
        {Array.from({ length: SkeletonSize }).map((_, index) => (
          <SkeletonProductCard key={index} />
        ))}
      </div>
    );
  }
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
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};
export default ProductList;
