import ProductList from "../components/ProductList";
import { useFetchAll } from "../hooks/useFetchAll";
const Home = () => {
  const { products, isLoading, error } = useFetchAll();
  if (isLoading) {
    return <ProductList skeleton={true} />;
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
    return <ProductList products={products} />;
  }
};
export default Home;
