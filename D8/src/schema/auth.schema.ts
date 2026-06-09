import { email, string, z } from "zod";
export const LoginSchema = z.object({
  email: string({ message: "Email phải là chuỗi kí tự" }).email({
    message: "Định dạng email không hợp lệ",
  }),
  password: string({ message: "Mật khẩu phải là chuỗi kí tự" })
    .min(6, { message: "Mật khẩu phải có tối thiểu 6 kí tự" })
    .max(12, { message: "Mật khẩu phải có tối đa 12 kí tự" }),
});
export const RegisterSchema = z.object({
  fullName: string({ message: "Họ tên phải là chuỗi kí tự" }),
  email: string({ message: "Email phải là chuỗi kí tự" }).email({
    message: "Định dạng email không hợp lệ",
  }),
  phoneNumber: string({ message: "Số điện thoại phải là chuỗi kí tự" })
    .min(10, { message: "Số điện thoại phải có ít nhất 10 kí tự" })
    .max(10, { message: "Số điện thoại phải có tối đa 10 kí tự" }),
  password: string({ message: "Mật khẩu phải là chuỗi kí tự" })
    .min(6, { message: "Mật khẩu phải có tối thiểu 6 kí tự" })
    .max(12, { message: "Mật khẩu phải có tối đa 12 kí tự" }),
});
export type LoginFormData = z.infer<typeof LoginSchema>;
export type RegisterFormData = z.infer<typeof RegisterSchema>;
