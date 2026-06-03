import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";
import { LoginFormData, LoginSchema } from "../schema/auth.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { email } from "zod";
const Login = () => {
  const login = useAuthStore((state) => state.login);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    mode: "onTouched",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from || "/";
  const onLogin = async (data: LoginFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const mockUser = {
        name: "Nguyễn Minh Tâm",
        email: "tamnguyen05052005@gmail.com",
        role: "Admin",
      };
      const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
      login(mockUser, mockToken);
      navigate(fromPage, { replace: true });
    } catch (error) {
      console.log("Có lỗi xảy ra", error);
    }
  };
  return (
    <>
      <div className="product-form-container">
        <h2 className="product-form-title">Form đăng nhập</h2>
        <form onSubmit={handleSubmit(onLogin)}>
          <div className="form-label">
            <label className="product-form-label">Email</label>
            <input type="text" disabled={isSubmitting} {...register("email")} />
            {errors.email && (
              <span style={{ color: "crimson" }}>{errors.email.message}</span>
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
            {isSubmitting ? "Hệ thống đang xử lý" : "Đăng nhập"}
          </button>
        </form>
      </div>
    </>
  );
};
export default Login;
