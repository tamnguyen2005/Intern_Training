import { productService } from "../services/product.service";
import { useNavigate } from "react-router-dom";
import AdminProductCard from "../components/AdminProductCard";
import "../css/ProductManagement.css";
import { useFetchAll } from "../hooks/useFetchAll";
import { useState } from "react";
import ProductList from "../components/ProductList.jsx";
const ProductManagement = () => {
  const [deletingId, setDeletingId] = useState<string | number | null>(null);
  const navigate = useNavigate();
  const { products, error, isLoading, refetch, setProduct } = useFetchAll();
  const handleDelete = async (id: number) => {
    const backup = [...products];
    setDeletingId(id);
    setProduct((prev) => prev.filter((p) => p.id !== products.id));
    try {
      await productService.delete(id);
      alert("Xóa sản phẩm thành công !");
      await refetch();
    } catch (err) {
      console.error(err);
      setProduct(backup);
    } finally {
      setDeletingId(null);
    }
  };
  if (isLoading) {
    return (
      <div>
        <button onClick={() => navigate("/product/create")}>
          Thêm sản phẩm mới
        </button>
        <ProductList skeleton={true} />
      </div>
    );
  }
  if (error) {
    return <h1>Có lỗi xảy ra {error}</h1>;
  }
  if (products.length === 0) {
    return (
      <div>
        <button onClick={() => navigate("/product/create")}>
          Thêm sản phẩm mới
        </button>
        <h1>Không có sản phẩm nào ở đây cả</h1>
      </div>
    );
  }
  return (
    <div>
      <button onClick={() => navigate("/product/create")}>
        Thêm sản phẩm mới
      </button>
      <div className="product-container">
        {products.map((p) => (
          <AdminProductCard
            key={p.id}
            product={p}
            deletingId={deletingId as number}
            handleDelete={handleDelete}
            handleUpdate={() => navigate(`/product/update/${p.id}`)}
          />
        ))}
      </div>
    </div>
  );
};
export default ProductManagement;
