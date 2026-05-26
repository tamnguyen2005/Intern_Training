import { useLocation, useNavigate, useOutletContext } from "react-router-dom";

const Login = () => {
  const { user, login } = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from || "/";
  const onLogin = () => {
    login();
    navigate(fromPage, { replace: true });
  };
  return (
    <>
      <span>
        {user ? `Xin chao ${user.name}` : "Bạn đang ở chế độ khách !"}
      </span>
      <button onClick={onLogin}>Đăng nhập</button>
    </>
  );
};
export default Login;
