import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router-dom";
import { RegisterFormData, RegisterSchema } from "../schema/auth.schema";
import { AuthService } from "../services/auth.service.ts";
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    mode: "onTouched",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from || "/login";
  const onRegister = async (data: RegisterFormData) => {
    try {
      await AuthService.register(data);
      navigate(fromPage, { replace: true });
    } catch (error) {
      console.log("Có lỗi xảy ra", error);
    }
  };
  return (
    <>
      <div className="product-form-container">
        <h2 className="product-form-title">Form đăng kí</h2>
        <form onSubmit={handleSubmit(onRegister)}>
          <div className="form-label">
            <label className="product-form-label">Full Name</label>
            <input
              type="text"
              disabled={isSubmitting}
              {...register("fullName")}
            />
            {errors.fullName && (
              <span style={{ color: "crimson" }}>{errors.email.fullName}</span>
            )}
          </div>
          <div className="form-label">
            <label className="product-form-label">Email</label>
            <input type="text" disabled={isSubmitting} {...register("email")} />
            {errors.email && (
              <span style={{ color: "crimson" }}>{errors.email.message}</span>
            )}
          </div>
          <div className="form-label">
            <label className="product-form-label">Phone Number</label>
            <input
              type="text"
              disabled={isSubmitting}
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && (
              <span style={{ color: "crimson" }}>
                {errors.email.phoneNumber}
              </span>
            )}
          </div>
          <div className="form-label">
            <label className="product-form-label">Mật khẩu</label>
            <input
              type="text"
              disabled={isSubmitting}
              {...register("password")}
            />
            {errors.password && (
              <span style={{ color: "crimson" }}>
                {errors.password.message}
              </span>
            )}
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Hệ thống đang xử lý" : "Đăng kí"}
          </button>
        </form>
        <div>
          <span>Đã có tài khoản ?</span>
          <button onClick={() => navigate("/login")}>Đăng nhập</button>
        </div>
      </div>
    </>
  );
};
export default Register;
