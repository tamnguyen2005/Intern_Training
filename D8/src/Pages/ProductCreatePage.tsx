import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";

const ProductCreatePage = () => {
  const navigate = useNavigate();
  return <ProductForm onSubmitSuccess={() => navigate("/product/manage")} />;
};
export default ProductCreatePage;
