import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";
import { LoginFormData, LoginSchema } from "../schema/auth.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { email } from "zod";
import { AuthService } from "../services/auth.service";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../types/auth.type";
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
      const response = await AuthService.login(data);
      const token = response.accessToken;
      const decoded = jwtDecode<JwtPayload>(token);
      login(decoded, token);
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
        <div>
          <span>Chưa có tài khoản ?</span>
          <button onClick={() => navigate("/register")}>Đăng kí</button>
        </div>
      </div>
    </>
  );
};
export default Login;
