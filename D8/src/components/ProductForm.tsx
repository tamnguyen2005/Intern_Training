import { useForm } from "react-hook-form";
import { ProductFormData, productSchema } from "../schema/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import "../css/ProductForm.css";
import { productService } from "../services/product.service";
import { Product } from "../types/product.type";
import { useEffect } from "react";
interface ProductFormProps {
  initialData?: Product | null;
  onSubmitSuccess?: () => void;
}
const ProductForm = ({ initialData, onSubmitSuccess }: ProductFormProps) => {
  const isEdit = !!initialData;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, dirtyFields },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    mode: "onTouched",
  });
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({
        name: "",
        category: "",
        description: "",
        imageUrl: "",
        price: 0,
      });
    }
  }, [initialData, reset]);
  const submit = async (data: ProductFormData) => {
    try {
      if (isEdit && initialData) {
        const changedFields: Partial<ProductFormData> = {};
        Object.keys(dirtyFields).forEach((key) => {
          const k = key as keyof ProductFormData;
          if (dirtyFields[k]) {
            changedFields[k] = data[k] as any;
          }
        });
        if (Object.keys(changedFields).length === 0) {
          alert("Bạn chưa thay đổi thông tin nào !");
          return;
        }
        await productService.update(initialData.id, changedFields);
        alert("Cập nhật sản phẩm thành công !");
      } else {
        await productService.create(data);
        alert("Tạo sản phẩm mới thành công !");
      }
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (err) {
      console.error("Đã có lỗi xảy ra", err);
    }
  };
  const errorEntries = Object.entries(errors);
  return (
    <div className="product-form-container">
      <h2 className="product-form-title">
        {isEdit ? "Form cập nhật sản phẩm" : "Form tạo sản phẩm mới"}
      </h2>
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
          {isSubmitting
            ? "Hệ thống đang xử lý"
            : isEdit
              ? "Cập nhật sản phẩm"
              : "Tạo sản phẩm mới"}
        </button>
      </form>
    </div>
  );
};
export default ProductForm;
