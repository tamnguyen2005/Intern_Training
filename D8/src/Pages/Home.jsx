import ProductList from "../components/ProductList";
import getProduct from "../data/product";
import { useOutletContext } from "react-router-dom";
const Home = () => {
  const products = getProduct();
  const { handleAddToCart } = useOutletContext() || {};
  if (products.length === 0) {
    return <div>Không có sản phẩm nào ở đây cả !</div>;
  }
  return <ProductList products={products} handleAddToCart={handleAddToCart} />;
};
export default Home;
