import ProductCard from "./ProductCard";
import "../css/ProductList.css";
const ProductList = ({ products = [] }) => {
  if (products.length === 0) {
    return <h1>There is no product here!</h1>;
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
