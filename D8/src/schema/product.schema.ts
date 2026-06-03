import { z } from "zod";
export const productSchema = z.object({
  name: z
    .string({ message: "Tên sản phẩm phải là chuỗi kí tự" })
    .min(3, { message: "Tên sản phẩm tối thiểu phải là 3 kí tự" })
    .max(100, { message: "Tên sản phẩm tối đa là 100 kí tự" }),
  description: z
    .string("Mô tả sản phẩm phải là chuỗi kí tự")
    .min(10, { message: "Mô tả sản phẩm tối thiểu là 10 kí tự" }),
  price: z
    .number({ message: "Giá sản phẩm phải là số" })
    .positive({ message: "Giá sản phẩm phải lớn hơn 0" }),
  category: z
    .string({ message: "Danh mục sản phẩm phải là chuỗi kí tự" })
    .min(3, { message: "Danh mục phải tối thiểu 3 kí tự" }),
  tag: z.string().optional(),
  imageUrl: z
    .string()
    .url({ message: "Đường dẫn ảnh phải là định dạng URL hợp lệ" }),
});
export type ProductFormData = z.infer<typeof productSchema>;
