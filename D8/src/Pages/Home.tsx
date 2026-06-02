import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import getProduct from "../data/product";
import { useOutletContext } from "react-router-dom";
import { Product } from "../types/product.type";
import { productService } from "../services/product.service";
const Home = () => {
  const { handleAddToCart } = useOutletContext() || {};
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const abortController = new AbortController();
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await productService.getAll(
          undefined,
          abortController.signal,
        );
        setProducts(result.data);
      } catch (err: any) {
        if (err.name === "CanceledError" || err.name === "canceled") {
          console.log("Request cũ đã được hủy thành công ngầm dưới nền");
          return;
        }
        setError(err?.message || "Có lỗi xảy ra với danh sách sản phẩm");
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };
    fetchProducts();
    return () => {
      abortController.abort();
    };
  }, []);
  if (isLoading) {
    return <ProductList handleAddToCart={handleAddToCart} skeleton={true}/>
  }
  if (error) {
    return (
      <>
        <h1>Có lỗi tải danh sách sản phẩm từ hệ thống</h1>
        <button
          onClick={() => {
            window.location.reload();
          }}
        >
          Thử tải lại trang
        </button>
      </>
    );
  }
  if (products.length === 0) {
    return <h1>Không có sản phẩm nào ở đây cả</h1>;
  }
  if (products.length > 0) {
    return (
      <ProductList handleAddToCart={handleAddToCart} products={products} />
    );
  }
};
export default Home;
