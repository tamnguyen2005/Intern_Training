import { email, string, z } from "zod";
export const LoginSchema = z.object({
  email: string({ message: "Email phải là chuỗi kí tự" }).email({
    message: "Định dạng email không hợp lệ",
  }),
  password: string({ message: "Mật khẩu phải là chuỗi kí tự" })
    .min(6, { message: "Mật khẩu phải có tối thiểu 6 kí tự" })
    .max(12, { message: "Mật khẩu phải có tối đa 12 kí tự" }),
});
export type LoginFormData = z.infer<typeof LoginSchema>;
