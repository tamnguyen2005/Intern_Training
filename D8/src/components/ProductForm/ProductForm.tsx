import { useForm } from "react-hook-form";
import { ProductFormData, productSchema } from "./product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import "../../css/ProductForm.css";
const ProductForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    mode: "onTouched",
  });
  const submit = async (data: ProductFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Dữ liệu được thêm lên server thành công", data);
      alert("Hello World");
      reset();
    } catch (error) {
      console.error("Đã có lỗi xảy ra !", error);
    }
  };
  const errorEntries = Object.entries(errors);
  return (
    <div className="product-form-container">
      <h2 className="product-form-title">Form tạo sản phẩm mới</h2>
      {errorEntries.length > 0 && (
        <ul>
          {errorEntries.map(([key, error]) => (
            <li key={key}>{error?.message}</li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit(submit)}>
        <div className="form-label">
          <label className="product-form-label">Tên sản phẩm</label>
          <input type="text" disabled={isSubmitting} {...register("name")} />
          {errors.name && (
            <span style={{ color: "crimson" }}>{errors.name.message}</span>
          )}
        </div>
        <div className="form-label">
          <label className="product-form-label">Giá sản phẩm</label>
          <input
            type="number"
            disabled={isSubmitting}
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <span style={{ color: "crimson" }}>{errors.price.message}</span>
          )}
        </div>
        <div className="form-label">
          <label className="product-form-label">Danh mục</label>
          <select disabled={isSubmitting} {...register("category")}>
            <option value="">--Chọn danh mục--</option>
            <option value="Mobile">Mobile</option>
            <option value="Laptop">Laptop</option>
            <option value="Accessories">Accessories</option>
          </select>
          {errors.category && (
            <span style={{ color: "crimson" }}>{errors.category.message}</span>
          )}
        </div>
        <div className="form-label">
          <label className="product-form-label">Mô tả sản phẩm</label>
          <input
            type="text"
            disabled={isSubmitting}
            {...register("description")}
          />
          {errors.description && (
            <span style={{ color: "crimson" }}>
              {errors.description.message}
            </span>
          )}
        </div>
        <div className="form-label">
          <label className="product-form-label">Ảnh sản phẩm</label>
          <input
            type="text"
            disabled={isSubmitting}
            {...register("imageUrl")}
          />
          {errors.imageUrl && (
            <span style={{ color: "crimson" }}>{errors.imageUrl.message}</span>
          )}
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Hệ thống đang xử lý" : "Tạo sản phẩm"}
        </button>
      </form>
    </div>
  );
};
export default ProductForm;
