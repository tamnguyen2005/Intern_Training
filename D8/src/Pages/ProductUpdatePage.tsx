import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { useFetchById } from "../hooks/useFetchById";

const ProductUpdatePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { product, error, isLoading } = useFetchById(id!);
  if (isLoading) return <div>Đang lấy thông tin sản phẩm</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Không tìm thấy sản phẩm trên hệ thống</div>;
  if (product)
    return (
      <ProductForm
        initialData={product}
        onSubmitSuccess={() => navigate("/product/manage")}
      />
    );
};
export default ProductUpdatePage;
