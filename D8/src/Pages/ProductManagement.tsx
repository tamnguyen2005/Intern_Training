import { productService } from "../services/product.service";
import { useNavigate } from "react-router-dom";
import AdminProductCard from "../components/AdminProductCard";
import "../css/ProductManagement.css";
import { useFetchAll } from "../hooks/useFetchAll";
import { useState } from "react";
const ProductManagement = () => {
  const [deletingId, setDeletingId] = useState<string | number | null>(null);
  const navigate = useNavigate();
  const { products, error, isLoading, refetch } = useFetchAll();
  const handleDelete = async (id: number) => {
    try {
      setDeletingId(id);
      await productService.delete(id);
      alert("Xóa sản phẩm thành công !");
      await refetch();
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };
  if (isLoading) {
    return <h1>Đang tải sản phẩm cho admin</h1>;
  }
  if (error) {
    return <h1>Có lỗi xảy ra ${error}</h1>;
  }
  if (products.length === 0) {
    return <h1>Không có sản phẩm nào ở đây cả</h1>;
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
